import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './CardCategory.module.css';

interface CardCategoryProps {
  label: string;
  description?: string;
  buttonLabel: string;
  onClick: () => void;
}

function CardCategory(props: CardCategoryProps) {
  const { label, buttonLabel, onClick, description } = props;
  return (
    <div className={styles.container}>
      <h3 className="text-center">{label}</h3>
      {description && <p className="text-center lead">{description}</p>}
      <Button variant="outline-dark" size="sm" onClick={onClick}>
        {buttonLabel}
      </Button>
    </div>
  );
}

CardCategory.defaultProps = {
  description: '',
};

export default CardCategory;
