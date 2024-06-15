import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../API/helpers/ClientAPI';

type FilterOptions = {
  categoryId?: string | null;
  colorFlower?: string;
  sizeFlower?: string;
  sort?: string | null;
  search?: string | null;
  language?: string;
  page?: number;
  pageSize?: number;
};

const useProductsByCategory = ({
  categoryId,
  colorFlower,
  sizeFlower,
  sort,
  search,
  language = 'en-GB',
  page = 1,
  pageSize = 5,
}: FilterOptions) => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchProducts = async (
    filters: string[],
    sortOption: string | null | undefined,
    searchQuery: string | null | undefined,
    languageQuery: string,
    pageNum: number,
    pageSizeNum: number,
  ) => {
    setLoading(true);
    setFetchError(null);
    try {
      const queryArgs: {
        filter: string[];
        sort?: string;
        [key: string]: string | string[] | undefined | boolean | number;
      } = {
        filter: filters,
        offset: (pageNum - 1) * pageSizeNum,
        limit: pageSizeNum,
      };

      if (sortOption) {
        queryArgs.sort = sortOption;
      }

      if (searchQuery) {
        queryArgs[`text.${languageQuery}`] = searchQuery;
        queryArgs.fuzzy = true;
      }

      const response = await apiRoot.productProjections().search().get({ queryArgs }).execute();
      setProducts(response.body.results);
      if (response.body.total) {
        setTotalPages(Math.ceil(response.body.total / pageSizeNum));
      }
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
    if (colorFlower) filters.push(`variants.attributes.color-flower.key:"${colorFlower}"`);
    if (sizeFlower) filters.push(`variants.attributes.size-flower.key:"${sizeFlower}"`);

    fetchProducts(filters, sort, search, language, page, pageSize);
  }, [categoryId, colorFlower, sizeFlower, sort, search, language, page, pageSize]);

  return { products, loading, error: fetchError, totalPages };
};

export default useProductsByCategory;
