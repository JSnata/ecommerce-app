import React from 'react';
import { CardGroup, Col, Container, Row } from 'react-bootstrap';
import useCart, { type CartItem } from '../../hooks/useCart';
import OrderSummary from './OrderSummary';

function OrderPage() {
  const { cartItems } = useCart();
  // console.log('CARTITEMS', cartItems);
  return (
    <Container>
      <Row>
        <Col>
          <h1>My Orders</h1>
        </Col>
        <Col>
          <CardGroup>
            {cartItems.map((item: CartItem) => (
              <OrderSummary
                key={item.id}
                id={item.id}
                quantity={item.quantity}
                price={item.price}
                totalPrice={item.totalPrice}
                productId={item.productId}
                productName={item.productName}
                productImageLink={item.productImageLink}
              />
            ))}
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderPage;
