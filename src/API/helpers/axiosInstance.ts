import axios, { AxiosInstance } from 'axios';
import { TokenStore } from '@commercetools/sdk-client-v2';
import { userTokenCache } from '../root/BuildCustomer';

/**
 * Retrieves the current token from the user token cache.
 * @returns {TokenStore} - The current token store containing the user's access token.
 */
function getStorageKey(): TokenStore {
  return userTokenCache.get();
}

/**
 * Creates an instance of Axios with base URL and request interceptor for adding Authorization header.
 * @returns {AxiosInstance} - An instance of Axios with the specified configuration.
 */
function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}`,
  });
  instance.interceptors.request.use((config) => {
    // eslint-disable-next-line no-param-reassign
    console.log(userTokenCache.get(), 'token');
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${getStorageKey().token}`;
    return config;
  });
  return instance;
}

export default createAxiosInstance;
