import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './CardItem.module.css';

type CardItemProps = {
  description?: string;
  imageLink?: string;
  showDescription?: boolean;
  prodId?: string;
};

function CardItem({ imageLink = '', description = '', showDescription = false, prodId = '' }: CardItemProps) {
  return (
    <Link to={`/product/${prodId}`} className={styles.container}>
      {imageLink && <Image src={imageLink} alt={description} rounded className={styles.cardImage} />}
      {showDescription && description && <p>{description}</p>}
    </Link>
  );
}

export default CardItem;
