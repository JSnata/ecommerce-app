import { useEffect, useState } from 'react';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../API/helpers/ClientAPI';

type CategoryWithProduct = {
  category: Category;
  product: ProductProjection | null;
};

const UseCategory = () => {
  const [categoryProductData, setCategoryProductData] = useState<CategoryWithProduct[]>([]);
  const fetchCategories = async (): Promise<Category[]> => {
    try {
      const response = await apiRoot.categories().get().execute();
      return response.body.results;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  const fetchProductByCategory = async (categoryId: string): Promise<ProductProjection | null> => {
    try {
      const response = await apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: [`categories.id:"${categoryId}"`],
          },
        })
        .execute();
      return response.body.results[0];
    } catch (error) {
      console.error(`Error fetching product for category ${categoryId}:`, error);
      return null;
    }
  };

  const fetchProductData = async (): Promise<void> => {
    const categories = await fetchCategories();
    const categoryProductPromises = categories.map(async (category) => {
      const product = await fetchProductByCategory(category.id);
      return { category, product };
    });
    const data = await Promise.all(categoryProductPromises);
    setCategoryProductData(data);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return categoryProductData;
};

export default UseCategory;
