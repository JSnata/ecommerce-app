import { useEffect, useState } from 'react';
import type { DiscountCode, DiscountCodeReference } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import CartService from '../API/CartService';

const usePromo = () => {
  const [promos, setPromos] = useState<DiscountCode[] | null>(null);
  const [appliedPromoCode, setAppliedPromoCode] = useState<DiscountCodeReference | undefined>(undefined);

  const addPromo = async (codeName: string) => {
    console.log('STATE 1 data!!!!', appliedPromoCode);
    if (appliedPromoCode !== undefined && appliedPromoCode !== null) {
      console.log('Cannot use more than one promo code');
      toast.error('Cannot use more than one promo code');
      return;
    }
    try {
      const response = await CartService.addDiscountCode(codeName);

      if (response && response.discountCodes && response.discountCodes.length > 0) {
        setAppliedPromoCode(response.discountCodes[0].discountCode);
        toast.success('Promo code applied successfully');
      } else {
        toast.error('No promo code found in response');
      }
    } catch (err) {
      console.error('Error applying promo code:', err);
      toast.error('Error applying promo code');
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

        if (currentCart && currentCart.discountCodes.length > 0) {
          console.log('STATE1');
          setAppliedPromoCode(currentCart.discountCodes[0].discountCode);
        } else {
          console.log('STATE2');
          setAppliedPromoCode(undefined);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Failed to fetch cart items');
      }
    };

    fetchData();
  }, []);

  // const removePromo = async () => {
  //   console.log('STATE 1 data!!!!', appliedPromoCode);
  //   try {
  //     if (!appliedPromoCode) {
  //       toast.warn('No active promo code to remove');
  //       return;
  //     }
  //
  //     const response = await CartService.deleteDiscountCode(appliedPromoCode.id);
  //
  //     if (response) {
  //       setAppliedPromoCode(undefined);
  //       toast.success('Promo code removed successfully');
  //     } else {
  //       toast.error('Failed to remove promo code');
  //     }
  //   } catch (err) {
  //     console.error('Error removing promo code:', err);
  //     toast.error('Error removing promo code');
  //   }
  // };

  // useEffect(() => {
  //   if (appliedPromoCode) {
  //     console.log('Applied promo code:', appliedPromoCode);
  //   } else {
  //     console.log('No promo code applied', appliedPromoCode);
  //     console.log(appliedPromoCode === undefined);
  //   }
  // }, [appliedPromoCode]);

  return { promos, addPromo, appliedPromoCode };
};

export default usePromo;
