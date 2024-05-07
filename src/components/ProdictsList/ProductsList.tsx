import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Product } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import ProductItem from '../ProductItem/ProductItem';
import useProducts from '../../hooks/useProducts';

function ProductsList() {
  const products = useProducts();
  return (
    <Container>
      <Row>
        {products.length > 0 ? (
          products.map((el: Product) => (
            <Col>
              <div key={el.id}>
                <ProductItem product={el} />
              </div>
            </Col>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Row>
    </Container>
  );
}

export default ProductsList;
