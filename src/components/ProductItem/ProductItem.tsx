import React, { FunctionComponent } from 'react';
import { Product } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { Button, Card } from 'react-bootstrap';

interface ProductItemProps {
  product: Product;
}
const ProductItem: FunctionComponent<ProductItemProps> = function ({ product }) {
  const { id, masterData } = product;
  return (
    <Card style={{ width: '15rem' }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{}</Card.Title>
        <Card.Text>
          <p>{id}</p>
          {masterData && masterData.current.description && (
            <p style={{ fontSize: '0.8rem' }}>{masterData.current.description['en-GB']}</p>
          )}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
