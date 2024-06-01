import { MyCustomerUpdateAction } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { toast } from 'react-toastify';
import { Customer } from '@commercetools/platform-sdk';
import { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { find } from 'lodash';
import ApiService from '../../API/apiService';
import { CustomerAddressSubset, CustomerProfileSubset } from '../../types/CustomerTypes';

type UpdateCustomerPayload = {
  name: string;
  value: string;
};

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

export function getCustomerMainProfileData(user: Customer): CustomerProfileSubset {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
  };
}

export function getCustomerAddressData(user: Customer): CustomerAddressSubset {
  return {
    addresses: user.addresses,
    shippingAddressIds: user.shippingAddressIds,
    billingAddressIds: user.billingAddressIds,
    defaultBillingAddressId: user.defaultBillingAddressId,
    defaultShippingAddressId: user.defaultShippingAddressId,
  };
}

export function getAddressById(id: string | undefined, addresses: BaseAddress[]) {
  return find(addresses, { id });
}

function getProfileAction(name: string, value: string) {
  console.log(name, value, 'value in action');
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

export async function updateCustomerData(data: UpdateCustomerPayload) {
  const currentVersion = await getCurrentCustomerVersion();
  try {
    const response = await ApiService.updateCustomer({
      version: currentVersion || 0,
      actions: [getProfileAction(data.name, data.value)],
    });
    if (response && response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
      toast.success(`Data updated successfully`);
    }
  } catch (error) {
    console.error('Error when updating data:', error);
  }
}

export async function updateCustomerAddress(data: BaseAddress) {
  console.log(data, 'updated address api');
  const currentVersion = await getCurrentCustomerVersion();
  try {
    const response = await ApiService.updateCustomer({
      version: currentVersion || 0,
      actions: [
        {
          action: 'changeAddress',
          addressId: data.id,
          address: {
            ...data,
          },
        },
      ],
    });
    if (response && response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
      toast.success(`Data updated successfully`);
    }
    return response;
  } catch (error) {
    console.error('Error when updating data:', error);
  }
  return null;
}

export async function manageAddressById(
  id: string,
  actionType: 'setDefaultBillingAddress' | 'setDefaultShippingAddress' | 'removeAddress',
) {
  const currentVersion = await getCurrentCustomerVersion();
  try {
    const response = await ApiService.updateCustomer({
      version: currentVersion || 0,
      actions: [
        {
          action: actionType,
          addressId: id,
        },
      ],
    });
    if (response && response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
      toast.success(`Data updated successfully`);
    }
    return response;
  } catch (error) {
    console.error('Error when updating data:', error);
  }
  return null;
}

export async function changeCustomerPassword(currentPassword: string, newPassword: string) {
  const currentVersion = await getCurrentCustomerVersion();
  try {
    const response = await ApiService.changePassword({
      version: currentVersion || 0,
      currentPassword,
      newPassword,
    });
    if (response && response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
      toast.success(`Data updated successfully`);
    }
    return response;
  } catch (error) {
    console.error('Error when updating data:', error);
    return null;
  }
}

export async function addNewAddress(data: BaseAddress) {
  const currentVersion = await getCurrentCustomerVersion();
  try {
    const response = await ApiService.updateCustomer({
      version: currentVersion || 0,
      actions: [
        {
          action: 'addAddress',
          address: data,
        },
      ],
    });
    if (response && response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
      toast.success(`Data updated successfully`);
    }
    return response;
  } catch (error) {
    console.error('Error when updating data:', error);
  }
  return null;
}
