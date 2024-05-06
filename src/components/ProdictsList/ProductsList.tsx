import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Product } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { getApiRoot, projectKey } from '../../API/BuildClient';
import ProductItem from '../ProductItem/ProductItem';

function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = async () => {
    try {
      const productsData = await getApiRoot().withProjectKey({ projectKey }).products().get().execute();
      setProducts(productsData.body.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
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
