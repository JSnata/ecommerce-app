import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../API/helpers/ClientAPI';

type FilterOptions = {
  categoryId?: string | null;
  color?: string;
  size?: string;
  sort?: string | null;
};

const useProductsByCategory = ({ categoryId, color, size, sort }: FilterOptions) => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchProducts = async (filters: string[], sortOption: string | null | undefined) => {
    setLoading(true);
    setFetchError(null);
    try {
      const queryArgs: { filter: string[]; sort?: string } = { filter: filters };
      if (sortOption) {
        queryArgs.sort = sortOption;
      }
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

    fetchProducts(filters, sort);
  }, [categoryId, color, size, sort]);

  return { products, loading, error: fetchError };
};

export default useProductsByCategory;
