/* eslint-disable */
import { useEffect, useState } from 'react';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { apiRoot } from '../API/helpers/ClientAPI';
import CartService from '../API/CartService';

export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId] = useState<string | null>(CartService.getCartId());

  const fetchCartItems = async (): Promise<void> => {
    try {
      const cart = await CartService.getCartItems();
      const items = cart!.lineItems.map((item: LineItem) => ({
        id: item.id,
        productId: item.productId,
        name: item.name.en,
        quantity: item.quantity,
        price: item.totalPrice.centAmount / 100,
      }));
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // const createCart = async (): Promise<string> => {
  //   try {
  //     const response = await apiRoot
  //       .carts()
  //       .post({
  //         body: {
  //           currency: 'USD',
  //         },
  //       })
  //       .execute();
  //
  //     if (response.statusCode === 201) {
  //       const newCartId = response.body.id;
  //       localStorage.setItem('cartId', newCartId);
  //       setCartId(newCartId);
  //       setCartVersion(response.body.version);
  //       return newCartId;
  //     } else {
  //       throw new Error('Failed to create cart');
  //     }
  //   } catch (error) {
  //     console.error('Error creating cart:', error);
  //     throw error;
  //   }
  // };

  const addToCart = async (productId: string): Promise<void> => {
    try {
      await CartService.addToCart(productId);
      await fetchCartItems();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeFromCart = async (lineItemId: string): Promise<void> => {
    try {
      await CartService.removeFromCart(lineItemId);
      await fetchCartItems();
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
