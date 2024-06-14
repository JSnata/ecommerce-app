import { useEffect, useState } from 'react';
import type { DiscountCode } from '@commercetools/platform-sdk';
import CartService from '../API/CartService';

const usePromo = () => {
  const [promo, setPromo] = useState<DiscountCode[] | null>(null);

  const fetchPromo = async () => {
    try {
      const promos = await CartService.getAllActivePromo();
      setPromo(promos);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  return { promo };
};

export default usePromo;
