import React from 'react';
import BenefitBlock from '../BenefitBlock/BenefitBlock';
import CategoryBlock from '../CategoryBlock/CategoryBlock';
import useCategory from '../../hooks/useCategory';
import styles from './MainSection.module.css';
import CardItem from '../../ui/Cards/CardItem/CardItem';
import image from '../../assets/img/section-image.jpg';

const defaultText = {
  benefitBlock: {
    label: 'Stylish bouquets by florists',
    description:
      'Our expert florists handcraft each bouquet with the freshest flowers and a touch of elegance, making every arrangement a unique piece of art. Order today and let us bring a little luxury into your life.',
  },
  cardCategory1: {
    label: 'Fresh Flowers',
    buttonLabel: 'Go view!',
  },
};

function MainSection() {
  const categoryWithProduct = useCategory();
  return (
    <div className={styles.sectionContainer}>
      {categoryWithProduct.length > 0 ? (
        <>
          <div className={styles.column1}>
            <BenefitBlock label={defaultText.benefitBlock.label} description={defaultText.benefitBlock.description} />
            <div>
              <CardItem imageLink={image} />
            </div>
          </div>
          <div className={styles.column2}>
            {categoryWithProduct.map(({ category, product }, index) => (
              <CategoryBlock
                key={`${category.id}-${product?.id}`}
                categoryDescription={category.description?.['en-GB'] ?? ''}
                categoryName={category.name?.['en-GB'] ?? ''}
                // buttonLabel="Shop Now"
                // onClick={() => {}}
                imageLink={product?.masterVariant?.images?.[0]?.url ?? ''}
                reverse={index % 2 === 0}
              />
            ))}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default MainSection;
