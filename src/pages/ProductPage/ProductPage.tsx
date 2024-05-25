import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CarouselComponent from '../../ui/Carusel/Carusel';
import style from './ProductPage.module.css';
import useProducts from '../../hooks/useProducts';

function ProductPage() {
  const products = useProducts();
  const product = products[0];
  const productSrc1 = product?.masterData?.current?.masterVariant?.images?.[0]?.url;
  const productSrc2 = product?.masterData?.current?.masterVariant?.images?.[1]?.url;
  const productSrc3 = product?.masterData?.current?.masterVariant?.images?.[2]?.url;
  const productName = product?.masterData?.current?.name?.['en-GB'];
  const productDescription = product?.masterData?.current?.description?.['en-GB'];
  const productPrice = product?.masterData?.current?.masterVariant?.prices?.[1]?.value?.centAmount;
  const productSrcArray = [productSrc1, productSrc2, productSrc3];

  console.log(products[0]);
  return (
    <div>
      <Row>
        <Col sm={10} md={6} className={`${style.col} ${style.left}`}>
          <CarouselComponent srcArray={productSrcArray} interval={null} id={product?.id} />
        </Col>
        <Col sm={10} md={6} className={`${style.col} ${style.right}`}>
          <Row>
            <Col>
              <h2>{productName}</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{productDescription}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>{productPrice?.toLocaleString()}$</h2>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ProductPage;
