import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Cart, LineItem } from '@commercetools/platform-sdk';
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
  const [cart, setCart] = useState<Cart | null>(null);

  const fetchCartItems = async (): Promise<void> => {
    try {
      const currentCart = await CartService.getCartItems();
      setCart(currentCart);
      // console.log(cart, currentCart, 'current promo cart info2');
      // console.log(currentCart, 'this cart with products');
      const items = currentCart!.lineItems.map((item: LineItem) => {
        // console.log(item, 'item in cart');
        return {
          id: item.id,
          quantity: item.quantity,
          price: item.price.value.centAmount / 100,
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
      toast.success('Success add product');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const getCartItemIdByProductId = (productId: string): string | undefined => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    return cartItem ? cartItem.id : undefined;
  };

  const removeFromCart = async (productId: string): Promise<void> => {
    const lineItemId = getCartItemIdByProductId(productId);
    if (!lineItemId) {
      console.error('not find line item with id');
      return;
    }
    try {
      await CartService.removeFromCart(lineItemId);
      await fetchCartItems();
      toast.success('Success delete product');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const changeQuantity = async (productId: string, quantity: number) => {
    const lineItemId = getCartItemIdByProductId(productId);
    if (!lineItemId) {
      console.error('not find line item with id');
      return;
    }
    try {
      await CartService.changeLineItemQuantity(lineItemId, quantity);
      await fetchCartItems();
      toast.success('Success change quantity');
    } catch (error) {
      console.error('Error update quantity in cart:', error);
    }
  };

  const clearCart = async () => {
    // console.log(cart, cart?.lineItems, 'DELETE CART');
    try {
      if (cart && cart.lineItems.length >= 1) {
        await CartService.clearCart(cart);
      } else {
        toast.warn('Cart is empty');
        return;
      }
      await fetchCartItems();
      toast.success('Success clear Cart');
    } catch (error) {
      console.error('Error clear cart', error);
    }
  };

  const isProductInCart = (productId: string): boolean => {
    return cartItems.some((item) => item.productId === productId);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    cartItems,
    cart,
    addToCart,
    clearCart,
    removeFromCart,
    changeQuantity,
    isInCart: isProductInCart,
    fetchCartItems,
  };
};

export default useCart;
