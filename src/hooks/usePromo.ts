import { useEffect, useState } from 'react';
import type { DiscountCode, DiscountCodeInfo } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import CartService from '../API/CartService';
import useCart from './useCart';

const usePromo = () => {
  const [promos, setPromos] = useState<DiscountCode[] | null>(null);
  const [appliedPromoCode, setAppliedPromoCode] = useState<DiscountCodeInfo | undefined>(undefined);
  const { setCart } = useCart();
  const addPromo = async (codeName: string) => {
    try {
      if (appliedPromoCode) {
        console.log('Cannot use more than one promo code');
        toast.error('Cannot use more than one promo code');
        return;
      }
      const response = await CartService.addDiscountCode(codeName);

      console.log('CODE RESPOSE', response);
      console.log(response);
      setCart(response);
      if (
        response &&
        response.discountCodes &&
        // response.discountCodes[0].state === 'MatchesCart' &&
        response.discountCodes.length > 0
      ) {
        setAppliedPromoCode(response.discountCodes[0]);
        toast.success('Promo code applied successfully');
      } else {
        toast.error('Promotion conditions not met');
      }
    } catch (err) {
      console.error('Error applying promo code:', err);
      toast.error('Error applying promo code');
    }
  };

  const removePromo = async () => {
    try {
      if (!appliedPromoCode) {
        toast.warn('No active promo code to remove');
        return;
      }
      const response = await CartService.deleteDiscountCode(appliedPromoCode.discountCode.id);
      console.log(response, 'resp 2');
      setCart(response);
      if (response) {
        setAppliedPromoCode(undefined);
        toast.success('Promo code removed successfully');
      } else {
        toast.error('Failed to remove promo code');
      }
    } catch (err) {
      console.error('Error removing promo code:', err);
      toast.error('Error removing promo code');
    }
  };

  const fetchAllPromo = async () => {
    try {
      const response = await CartService.getAllActivePromo();
      setPromos(response);
    } catch (err) {
      console.error('Error fetching active promos:', err);
      toast.error('Failed to fetch active promos');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAllPromo();
        const currentCart = await CartService.getCartItems();

        if (
          currentCart &&
          currentCart.discountCodes.length > 0
          // currentCart.discountCodes[0].state === 'MatchesCart'
        ) {
          setCart(currentCart);
          setAppliedPromoCode(currentCart.discountCodes[0]);
        } else {
          setCart(currentCart);
          setAppliedPromoCode(undefined);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Failed to fetch cart items');
      }
    };

    fetchData();
  }, []);

  return { promos, addPromo, removePromo, appliedPromoCode };
};

export default usePromo;
