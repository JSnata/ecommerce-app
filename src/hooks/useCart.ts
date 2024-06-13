/* eslint-disable */
import { useEffect, useState } from 'react';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { apiRoot } from '../API/helpers/ClientAPI';
import CartService from '../API/CartService';

export type CartItem = {
  id: string;
  quantity: number;
  price: number;
  totalPrice: number;
  productId: string;
  productName: string;
  productImageLink: string;
};

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [cartProducts, setCartProducts] = useState ([]);
  const [cartId] = useState<string | null>(CartService.getCartId());

  const fetchCartItems = async (): Promise<void> => {
    try {
      const cart = await CartService.getCartItems();
      console.log(cart, 'this cart with products');
      const items = cart!.lineItems.map((item: LineItem) => {
        console.log(item, 'item in cart');
        return {
          id: item.id,
          quantity: item.quantity,
          price: item.totalPrice.centAmount / 100,
          totalPrice: item.totalPrice.centAmount / 100,
          productId: item.productId,
          productName: item.name['en-GB'],
          productImageLink: item.variant?.images?.[0]?.url ?? '',
        } as CartItem;
      });
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

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

  const isProductInCart = (productId: string): boolean => {
    return cartItems.some((item) => item.id === productId);
  };

  useEffect(() => {
    if (cartId) {
      fetchCartItems();
    }
  }, [cartId]);

  return { cartItems, addToCart, removeFromCart, isInCart: isProductInCart };
};

export default useCart;
