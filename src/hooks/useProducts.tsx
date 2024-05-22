import { useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { apiRoot } from '../API/helpers/ClientAPI';

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const productsData = await apiRoot.products().get().execute();
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
