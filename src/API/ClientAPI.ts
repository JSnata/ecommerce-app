import { getApiRoot } from './root/BuildClient';

/**
 * Retrieves the API root for the authenticated client.
 * Needs to manage the project and all data
 */
const apiRoot = getApiRoot();

/**
 * Retrieves store data from the API.
 * @returns {Promise<any>} A Promise that resolves with the store data if successful, or null if there was an error.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getStoreData = async () => {
  try {
    const response = await apiRoot.stores().get().execute();
    return response.body;
  } catch (error) {
    console.error('Error creating customer:', error);
    return null;
  }
};
