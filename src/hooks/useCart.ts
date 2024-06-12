/* eslint-disable */
import { useEffect, useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { apiRoot } from '../API/helpers/ClientAPI';

export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(localStorage.getItem('cartId'));
  const [cartVersion, setCartVersion] = useState<number | null>(null);

  const fetchCartItems = async (): Promise<void> => {
    if (!cartId) return;

    try {
      const response = await apiRoot
        .carts()
        .withId({ ID: cartId })
        .get({
          queryArgs: {
            expand: 'lineItems[*].product',
          },
        })
        .execute();

      const cart = response.body;
      setCartVersion(cart.version);

      const items = cart.lineItems.map((item: LineItem) => ({
        id: item.id,
        name: item.name.en,
        quantity: item.quantity,
        price: item.totalPrice.centAmount / 100,
      }));
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const createCart = async (): Promise<string> => {
    try {
      const response = await apiRoot
        .carts()
        .post({
          body: {
            currency: 'USD',
          },
        })
        .execute();

      if (response.statusCode === 201) {
        const newCartId = response.body.id;
        localStorage.setItem('cartId', newCartId);
        setCartId(newCartId);
        setCartVersion(response.body.version);
        return newCartId;
      } else {
        throw new Error('Failed to create cart');
      }
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    }
  };

  const addToCart = async (productId: string): Promise<void> => {
    if (!cartId) {
      const newCartId = await createCart();
      setCartId(newCartId);
    }

    try {
      const productResponse = await apiRoot.productProjections().withId({ ID: productId }).get().execute();

      const product = productResponse.body;

      if (!product) {
        console.error('Product not found');
        return;
      }
      console.log(product);

      if (!cartVersion) {
        console.error('No cart version');
        return;
      }

      const response = await apiRoot
        .carts()
        .withId({ ID: cartId ? cartId : '' })
        .post({
          body: {
            version: cartVersion,
            actions: [
              {
                action: 'addLineItem',
                productId,
                variantId: Number(product.id),
                quantity: 1,
              },
            ],
          },
        })
        .execute();

      if (response.statusCode === 200) {
        await fetchCartItems();
      } else {
        console.error('Failed to add item to cart:', response.body);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeFromCart = async (lineItemId: string): Promise<void> => {
    if (!cartId || !cartVersion) return;

    try {
      const response = await apiRoot
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version: cartVersion,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId,
              },
            ],
          },
        })
        .execute();

      if (response.statusCode === 200) {
        await fetchCartItems();
      } else {
        console.error('Failed to remove item from cart:', response.body);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const isInCart = (productId: string): boolean => {
    return cartItems.some((item) => item.id === productId);
  };

  useEffect(() => {
    if (cartId) {
      fetchCartItems();
    }
  }, [cartId]);

  return { cartItems, addToCart, removeFromCart, isInCart };
};

export default useCart;
