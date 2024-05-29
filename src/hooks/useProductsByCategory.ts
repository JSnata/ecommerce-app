import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../API/helpers/ClientAPI';

const useProductsByCategory = (categoryId: string | null) => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchProductsByCategory = async (catId: string): Promise<void> => {
    setLoading(true);
    setFetchError(null);
    try {
      const response = await apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: [`categories.id:"${catId}"`],
          },
        })
        .execute();
      setProducts(response.body.results);
    } catch (err) {
      console.error(`Error fetching products for category ${catId}:`, err);
      setFetchError(`Error fetching products for category ${catId}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchProductsByCategory(categoryId);
    }
  }, [categoryId]);

  return { products, loading, error: fetchError };
};

export default useProductsByCategory;
