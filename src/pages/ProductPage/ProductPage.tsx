import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CarouselComponent from '../../ui/Carusel/Carusel';
import style from './ProductPage.module.css';
import useProducts from '../../hooks/useProducts';

function ProductPage() {
  const products = useProducts();
  const product = products[0];
  const productSrc = product?.masterData?.current?.masterVariant?.images?.[1]?.url;
  const productName = product?.masterData?.current?.name?.['en-GB'];
  const productDescription = product?.masterData?.current?.description?.['en-GB'];
  const productPrice = product?.masterData?.current?.masterVariant?.prices?.[1]?.value?.centAmount;

  console.log(products[0]);
  return (
    <div>
      <h4>Product Page</h4>
      <Container>
        <Row>
          <Col xs={10} md={6} className={style.col}>
            <CarouselComponent src={productSrc} />
          </Col>
          <Col xs={10} md={6} className={style.col}>
            <Row>
              <Col>
                <h2>{productName}</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className={style.description}>{productDescription}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>{productPrice?.toLocaleString()}$</h2>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductPage;
