import { useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { apiUser } from '../API/CustomerAPI';

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const productsData = await apiUser.products().get().execute();
      setProducts(productsData.body.results);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return products;
}

export default useProducts;
