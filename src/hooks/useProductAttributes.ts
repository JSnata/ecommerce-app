/* eslint-diasble */
import { useEffect, useState } from 'react';
import { apiRoot } from '../API/helpers/ClientAPI';

export type ProductAttributes = {
  brands: string[];
  colors: string[];
  sizes: string[];
};

const useProductAttributes = () => {
  const [attributes, setAttributes] = useState<ProductAttributes>({
    brands: [],
    colors: [],
    sizes: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttributes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRoot.productProjections().search().get().execute();
      const products = response.body.results;

      const brands = new Set<string>();
      const colors = new Set<string>();
      const sizes = new Set<string>();

      products.forEach((product) => {
        product.masterVariant?.attributes?.forEach((attribute) => {
          if (attribute.name === 'brand') brands.add(attribute.value);
          if (attribute.name === 'color') colors.add(attribute.value);
          if (attribute.name === 'size') sizes.add(attribute.value);
        });
      });

      setAttributes({
        brands: Array.from(brands),
        colors: Array.from(colors),
        sizes: Array.from(sizes),
      });
    } catch (err) {
      console.error('Error fetching attributes:', err);
      setError('Error fetching attributes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  return { attributes, loading, error };
};

export default useProductAttributes;
