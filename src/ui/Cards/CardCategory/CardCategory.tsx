import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './CardCategory.module.css';

interface CardCategoryProps {
  label: string;
  description?: string;
  buttonLabel: string;
  onClick: () => void;
}

function CardCategory({ label, buttonLabel, onClick, description = '' }: CardCategoryProps) {
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

export default CardCategory;
