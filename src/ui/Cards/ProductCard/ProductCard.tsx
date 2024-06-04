import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CardItem from '../CardItem/CardItem';
import styles from './ProductCard.module.css';

type CardItemProps = {
  name: string;
  id?: string;
  description?: string;
  imageLink?: string;
  price?: string;
  discountPrice?: string;
};

function ProductCard({
  name = '',
  imageLink = '',
  description = '',
  id = '',
  price = '',
  discountPrice = '',
}: CardItemProps) {
  return (
    <Col key={id} md={6} className={styles.card}>
      <Link to={`/product/${id}`} className={styles.cardContent}>
        <div className={styles.cardImgContainer}>
          <CardItem description={description} imageLink={imageLink} showDescription={false} />
        </div>
        <h3>{name}</h3>
        <p>{description}</p>
        <p className={styles.price}>
          Price: <span className={styles.discountPrice}>{discountPrice}</span> {price}
        </p>
      </Link>
    </Col>
  );
}

export default ProductCard;
