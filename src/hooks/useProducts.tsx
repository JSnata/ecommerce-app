import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../API/helpers/ClientAPI';

function useProducts() {
  const [products, setProducts] = useState<ProductProjection[]>([]);

  const getProducts = async () => {
    try {
      const productsData = await apiRoot.productProjections().get().execute();
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
