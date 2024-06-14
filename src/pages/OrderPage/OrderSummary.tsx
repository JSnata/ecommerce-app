import React from 'react';
import { Button, Card, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import { Trash3Fill } from 'react-bootstrap-icons';

type OrderSummaryProps = {
  quantity: number;
  price: number;
  totalPrice: number;
  productId: string;
  productName: string;
  productImageLink: string;
  onRemove?: (id: string) => Promise<void>;
  onChange?: (id: string, quantity: number) => Promise<void>;
};

function OrderSummary({
  productId,
  quantity,
  price,
  totalPrice,
  productName,
  productImageLink,
  onRemove,
  onChange,
}: OrderSummaryProps) {
  const handleIncrement = () => {
    if (onChange) {
      onChange(productId, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (onChange) {
      onChange(productId, quantity - 1);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(productId);
    }
  };
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
        <InputGroup style={{ width: '100%', margin: 'auto' }}>
          <Button variant="dark" onClick={handleDecrement}>
            -
          </Button>
          <FormControl aria-describedby="" value={quantity} style={{ textAlign: 'center' }} readOnly />
          <Button variant="dark" onClick={handleIncrement}>
            +
          </Button>
        </InputGroup>
        <Button className="mx-3 my-2" type="button" size="sm" variant="danger" onClick={handleRemove}>
          <Trash3Fill />
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default OrderSummary;
