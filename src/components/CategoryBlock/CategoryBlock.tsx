import React from 'react';
import CardItem from '../../ui/Cards/CardItem/CardItem';
import CardCategory from '../../ui/Cards/CardCategory/CardCategory';
import styles from './CategoryBlock.module.css';

type CategoryCardProps = {
  categoryDescription?: string;
  categoryName: string;
  buttonLabel: string;
  onClick: () => void;
  imageLink: string;
  reverse?: boolean;
};

function CategoryBlock(props: CategoryCardProps) {
  const { reverse, categoryName, buttonLabel, onClick, imageLink, categoryDescription } = props;
  return (
    <div className={styles.categoryBlock}>
      {reverse ? (
        <>
          <div className={styles.itemContainer}>
            <CardItem imageLink={imageLink} />
          </div>
          <div className={styles.cardContainer}>
            <CardCategory
              label={categoryName}
              buttonLabel={buttonLabel}
              onClick={onClick}
              description={categoryDescription}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.cardContainer}>
            <CardCategory
              label={categoryName}
              buttonLabel={buttonLabel}
              onClick={onClick}
              description={categoryDescription}
            />
          </div>
          <div className={styles.itemContainer}>
            <CardItem imageLink={imageLink} />
          </div>
        </>
      )}
    </div>
  );
}

CategoryBlock.defaultProps = {
  reverse: false,
  categoryDescription: '',
};
export default CategoryBlock;
