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

type UpdateCustomerDataPayload = {
  name: string;
  value: string;
};

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
    case 'dateOfBirth':
      action = {
        action: 'setDateOfBirth',
        dateOfBirth: value,
      };
      break;
    default:
      throw new Error(`Unknown action for input name: ${name}`);
  }
  console.log(action, 'Current action');
  return action;
}

const getCurrentCustomerVersion = async () => {
  try {
    const response = await ApiService.getCustomerData();
    return response?.body.version;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export async function updateCustomerData(data: UpdateCustomerDataPayload) {
  const currentVersion = await getCurrentCustomerVersion();
  try {
    const response = await ApiService.updateCustomer({
      version: currentVersion || 0,
      actions: [getAction(data.name, data.value)],
    });
    if (response && response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
      toast.success(`Data updated successfully`);
    } else {
      console.error('Error when updating data:', response?.statusCode, response?.body);
      toast.error('An error occurred while updating data');
    }
  } catch (error) {
    console.error('Error when updating data:', error);
    toast.error('An error occurred while updating data');
    throw error;
  }
}

export async function changeCustomerPassword(currentPassword: string, newPassword: string) {
  console.log('Change Customer Password');
  const currentVersion = await getCurrentCustomerVersion();
  try {
    const response = await ApiService.changePassword({
      version: currentVersion || 0,
      currentPassword,
      newPassword,
    });
    if (response && response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
      toast.success(`Data updated successfully`);
    } else {
      console.error('Error when updating data:', response?.statusCode, response?.body);
      toast.error('An error occurred while updating data');
    }
  } catch (error) {
    console.error('Error when updating data:', error);
    toast.error('An error occurred while updating data');
    throw error;
  }
}
