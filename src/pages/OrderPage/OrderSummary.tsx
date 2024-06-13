import React from 'react';
import { Button, Card, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import type { CartItem } from '../../hooks/useCart';
// type OrderSummaryProps = {
//   id: string;
//   quantity: number;
//   price: number;
//   totalPrice: number;
//   productId: string;
//   productName: string;
//   productImageLink: string;
//   handleAdd?: () => void;
// };

function OrderSummary({ quantity, price, totalPrice, productName, productImageLink }: CartItem) {
  // function handleIncrement(): void {

  // }

  // function handleDecrement():void {

  // }

  return (
    <Card style={{ width: '100%' }}>
      <Card.Img variant="top" src={productImageLink || ''} />
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Single Price: {price} €</ListGroup.Item>
          <ListGroup.Item>Total Price: {totalPrice} €</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        {/* <ButtonGroup className="me-2 mx-2 p-3" aria-label="">
          <Button size="sm" variant="dark">
            -
          </Button>
          <Button size="sm" variant="dark">
            6
          </Button>
          <Button size="sm" variant="dark">
            +
          </Button>
        </ButtonGroup>
        <Button size="sm" variant="dark">
          Go somewhere
        </Button>
        <Button size="sm" variant="dark">
          Go somewhere
        </Button> */}

        <InputGroup style={{ width: '100%', margin: 'auto' }}>
          <Button variant="dark" onClick={handleIncrement}>
            -
          </Button>
          <FormControl aria-describedby="" value={quantity} style={{ textAlign: 'center' }} readOnly />
          <Button variant="dark" onClick={handleIncrement}>
            +
          </Button>
        </InputGroup>
      </Card.Footer>
    </Card>
  );
}

export default OrderSummary;
