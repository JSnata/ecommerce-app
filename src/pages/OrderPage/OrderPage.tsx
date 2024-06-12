import React from 'react';
import { Container } from 'react-bootstrap';
import useAuthContext from '../../hooks/useAuthContext';

function OrderPage() {
  const { user } = useAuthContext();
  const customerId = user?.id;
  console.log('customerId', customerId);
  // (async () => {
  //   try {
  //     const userdata = await apiService.getCustomerData();
  //     const order = apiRoot
  //       .orders()
  //       .get()
  //       .execute()
  //       .then((response) => {
  //         console.log(response, 'orders response');
  //       });
  //
  //     const cards = await apiRoot
  //       .carts()
  //       .get()
  //       .execute()
  //       .then((response) => {
  //         console.log(response, 'cards response');
  //       });
  //
  //     const clientCard = apiService.userApi
  //       ?.me()
  //       .carts()
  //       .get()
  //       .execute()
  //       .then((response) => {
  //         console.log(response, 'client cards');
  //       });
  //
  //     // const anonymousCart = await apiService.createAnonymousCart();
  //     // console.log(anonymousCart, 'anonymous cart');
  //
  //     console.log(userdata);
  //   } catch (error) {
  //     console.error('Ошибка получения данных:', error);
  //   }
  // })();

  return (
    <Container>
      <h1>HI order!</h1>
    </Container>
  );
}

export default OrderPage;
