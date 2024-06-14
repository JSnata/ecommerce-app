import React from 'react';
import { Button, CardGroup, Col, Container, Row } from 'react-bootstrap';
import useCart, { type CartItem } from '../../hooks/useCart';
import OrderSummary from './OrderSummary';

function OrderPage() {
  const { cartItems, removeFromCart, changeQuantity, cart } = useCart();
  const totalPrice = cart && cart.totalPrice ? cart.totalPrice.centAmount / 100 : 0;
  return (
    <Container fluid>
      <h1>My Orders</h1>
      <Row>
        <Col sm={12} md={4}>
          <h5>Manage Orders</h5>
          <Row className="lead">Current Total Price : {totalPrice}</Row>
          <Row>
            <Button variant="datk">Clear Cart</Button>
          </Row>
          <Row>1</Row>
          <Row>1</Row>
          <Row>1</Row>
          <Row>1</Row>
          <Row>1</Row>
        </Col>
        <Col sm={12} md={8}>
          <h5>Products</h5>
          <CardGroup>
            {cartItems.map((item: CartItem) => (
              <OrderSummary
                key={item.id}
                quantity={item.quantity}
                price={item.price}
                totalPrice={item.totalPrice}
                productId={item.productId}
                productName={item.productName}
                productImageLink={item.productImageLink}
                onRemove={removeFromCart}
                onChange={changeQuantity}
              />
            ))}
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderPage;
