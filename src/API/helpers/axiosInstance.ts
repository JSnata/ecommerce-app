import axios, { AxiosInstance } from 'axios';
import { TokenStore } from '@commercetools/sdk-client-v2';
import { userTokenCache } from '../root/BuildCustomer';

function getStorageKey(): TokenStore {
  return userTokenCache.get();
}
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
