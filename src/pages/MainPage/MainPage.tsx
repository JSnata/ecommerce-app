import React from 'react';
import ProductsList from '../../components/ProdictsList/ProductsList';
import { ICustomerAddress, ICustomerCreateData } from '../../types/CustomerTypes';
import { Country } from '../../types/enumCounty';
import ApiService from '../../API/apiService';
import BenefitBlock from '../../ui/BenefitBlock/BenefitBlock';

function MainPage() {
  const testCustomerAddress: ICustomerAddress = {
    street: 'Street for Test',
    city: 'Test City',
    postalCode: '12345',
    country: Country.Afghanistan,
  };

  const testCustomer: ICustomerCreateData = {
    email: 'sss4@example.com',
    password: '1q3EJO6Ele4BTF',
    firstName: 'Test2',
    lastName: 'Test2',
    addresses: [testCustomerAddress],
    defaultShippingAddress: 0,
    shippingAddresses: [0],
    defaultBillingAddress: 0,
    billingAddresses: [0],
  };

  const handleCreate = () => {
    ApiService.register(testCustomer).then((response) => {
      console.log(response);
    });
  };
  const handlerSignIn = () => {
    ApiService.login('sss@example.com', '1q3EJO6Ele4BTF').then((response) => {
      console.log('Customer signed in:', response);
    });
  };

  const randomHandler = () => {
    ApiService.getProducts();
  };

  return (
    <div>
      <button type="button" onClick={handleCreate}>
        CreateCustomer
      </button>
      <button type="button" onClick={handlerSignIn}>
        LoginCustomer
      </button>
      <button type="button" onClick={randomHandler}>
        Random
      </button>
      <ProductsList />
      <BenefitBlock>
        <h3>Stylish bouquets by florists</h3>
        <p>
          The task of the organization, especially the strengthening and development of the structure allows us to
          assess the importance of the directions of progressive development.{' '}
        </p>
      </BenefitBlock>
    </div>
  );
}

export default MainPage;
