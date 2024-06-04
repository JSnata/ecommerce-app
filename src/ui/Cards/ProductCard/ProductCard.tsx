import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CardItem from '../CardItem/CardItem';
import styles from './ProductCard.module.css';

type CardItemProps = {
  name: string;
  id?: string;
  description?: string;
  imageLink?: string;
  price?: string | number;
  productDiscount?: string | number;
  productDiscountPrice?: number;
  productCode?: string;
};

function ProductCard({
  name = '',
  imageLink = '',
  description = '',
  id = '',
  price = '',
  productDiscount = '',
  productDiscountPrice = 0,
  productCode = '',
}: CardItemProps) {
  console.log('productDiscount:', productDiscount);
  console.log('productDiscountPrice:', productDiscountPrice);
  console.log('productCode', productCode);
  console.log('price', price);
  return (
    <Col key={id} md={6} className={styles.card}>
      <Link to={`/product/${id}`} className={styles.cardContent}>
        <Row>
          <div className={styles.cardImgContainer}>
            <CardItem description={description} imageLink={imageLink} showDescription={false} />
          </div>
          <h3>{name}</h3>
          <p>{description}</p>
        </Row>
        <Row>
          {(productDiscountPrice && (
            <h2>
              {productDiscount} {productCode}
            </h2>
          )) ||
            ''}
          <h2 className={productDiscountPrice ? `${styles.oldPrice}` : ''}>
            {price} {productCode}
          </h2>
        </Row>
      </Link>
    </Col>
  );
}

export default ProductCard;
