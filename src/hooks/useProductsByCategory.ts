import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../API/helpers/ClientAPI';

const useProductsByCategory = (categoryId: string | null) => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchProducts = async (filter: string | undefined) => {
    setLoading(true);
    setFetchError(null);
    try {
      const queryArgs = filter ? { filter: [filter] } : {};
      const response = await apiRoot.productProjections().search().get({ queryArgs }).execute();
      setProducts(response.body.results);
    } catch (err) {
      console.error('Error fetching products:', err);
      setFetchError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filter = categoryId ? `categories.id:"${categoryId}"` : undefined;
    fetchProducts(filter);
  }, [categoryId]);

  return { products, loading, error: fetchError };
};

export default useProductsByCategory;
