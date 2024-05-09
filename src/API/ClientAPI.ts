import { getApiRoot } from './root/BuildClient';

const apiRoot = getApiRoot();
const getStoreData = async () => {
  try {
    const response = await apiRoot.stores().get().execute();
    return response.body;
  } catch (error) {
    console.error('Error creating customer:', error);
    return null;
  }
};

export default getStoreData;
