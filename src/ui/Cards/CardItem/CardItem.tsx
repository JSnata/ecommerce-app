import React from 'react';
import { Image } from 'react-bootstrap';
import styles from './CardItem.module.css';

type CardItemProps = {
  description?: string;
  imageLink?: string;
  showDescription?: boolean;
};

function CardItem({ imageLink, description, showDescription }: CardItemProps) {
  return (
    <div className={styles.container}>
      {imageLink && <Image src={imageLink} alt={description} rounded className={styles.cardImage} />}
      {/* <img className={styles.cardImage} src={imageLink} /> */}
      {showDescription && description && <p>{description}</p>}
    </div>
  );
}
CardItem.defaultProps = {
  imageLink: '',
  description: '',
  showDescription: false,
};
export default CardItem;
