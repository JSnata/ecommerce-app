import { useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { getApiRoot, projectKey } from '../API/BuildClient';

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const productsData = await getApiRoot().withProjectKey({ projectKey }).products().get().execute();
      setProducts(productsData.body.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return products;
}

export default useProducts;
