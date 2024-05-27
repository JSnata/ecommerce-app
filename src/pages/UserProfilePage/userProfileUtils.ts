import { MyCustomerUpdateAction } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { toast } from 'react-toastify';
import { Customer } from '@commercetools/platform-sdk';
import ApiService from '../../API/apiService';
import { CustomerMainProfileSubset } from '../../types/CustomerTypes';

export const getInputTypeByNameField = (key: string): string => {
  switch (key) {
    case 'dateOfBirth':
      return 'date';
    case 'password':
      return 'password';
    default:
      return 'text';
  }
};

export function getCustomerMainProfileData(user: Customer): CustomerMainProfileSubset {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
  };
}

// export function getCustomerPasswordData(user: Customer) {
//   return {
//     email: user.email,
//     password: user.password,
//   };
// }
//
// export function getCustomerAddressData(user: Customer) {
//   return {
//     email: user.email,
//     addresses: user.addresses,
//     shippingAddresses: user.shippingAddresses,
//     billingAddresses: user.billingAddresses,
//     defaultBillingAddress: user.defaultBillingAddress,
//     defaultShippingAddress: user.defaultShippingAddress,
//   };
// }

function getAction(name: string, value: string) {
  let action: MyCustomerUpdateAction;

  switch (name) {
    case 'email':
      action = {
        action: 'changeEmail',
        email: value,
      };
      break;
    case 'firstName':
      action = {
        action: 'setFirstName',
        firstName: value,
      };
      break;
    case 'lastName':
      action = {
        action: 'setLastName',
        lastName: value,
      };
      break;
    default:
      throw new Error(`Unknown action for input name: ${name}`);
  }
  console.log(action, 'CURRENT ACTION');
  return action;
}

export async function updateCustomerData(data: { name: string; value: string }, version: number) {
  console.log(version, 'Current version of Customer');
  let currentVersionOfCustomer: number = 0;
  try {
    const getCurrentVersion = await ApiService.getCustomerData();
    if (getCurrentVersion) {
      currentVersionOfCustomer = getCurrentVersion?.body.version;
    }
    const response = await ApiService.updateCustomer({
      version: currentVersionOfCustomer,
      actions: [getAction(data.name, data.value)],
    });
    if (response && response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
      toast.success(`Данные успешно обновлены`);
    } else {
      console.error('Ошибка при обновлении данных:', response?.statusCode, response?.body);
      toast.error('Произошла ошибка при обновлении данных');
    }
  } catch (error) {
    console.error('Ошибка при обновлении данных клиента:', error);
    toast.error('Произошла ошибка при обновлении данных');
    throw error;
  }
}
