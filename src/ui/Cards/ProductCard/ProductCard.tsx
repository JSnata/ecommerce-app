import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
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
  isInCart: boolean;
  handleAddToCart: (id: string) => void;
  handleDeleteFromCart: (id: string) => void;
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
  isInCart = false,
  handleAddToCart,
  handleDeleteFromCart,
}: CardItemProps) {
  const onAddToCart = () => {
    handleAddToCart(id || '');
  };

  const onDeleteFromCart = () => {
    handleDeleteFromCart(id || '');
  };

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
      </Link>
      <Row className={styles.prices}>
        {productDiscountPrice ? (
          <h2 className={styles.discountPrice}>
            {productDiscount} {productCode}
          </h2>
        ) : null}
        <h2 className={productDiscountPrice ? `${styles.oldPrice} ${styles.price}` : styles.price}>
          {price} {productCode}
        </h2>
      </Row>
      <div className={styles.buttonContainer}>
        <Button
          className="mx-2"
          variant={isInCart ? 'outline-secondary' : 'dark'}
          onClick={onAddToCart}
          disabled={isInCart}
        >
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </Button>

        {isInCart ? (
          <Button variant="dark" onClick={onDeleteFromCart} className="mx-2">
            Delete
          </Button>
        ) : (
          ''
        )}
      </div>
    </Col>
  );
}

export default ProductCard;
