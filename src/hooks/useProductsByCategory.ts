import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../API/helpers/ClientAPI';

type FilterOptions = {
  categoryId?: string | null;
  color?: string;
  size?: string;
};

const useProductsByCategory = ({ categoryId, color, size }: FilterOptions) => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchProducts = async (filters: string[]) => {
    setLoading(true);
    setFetchError(null);
    try {
      const queryArgs = { filter: filters };
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
    const filters = [];
    if (categoryId) filters.push(`categories.id:"${categoryId}"`);
    if (color) filters.push(`variants.attributes.color:"${color}"`);
    if (size) filters.push(`variants.attributes.size:"${size}"`);

    fetchProducts(filters);
  }, [categoryId, color, size]);

  return { products, loading, error: fetchError };
};

export default useProductsByCategory;
