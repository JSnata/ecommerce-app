import React from 'react';
import { Row, Col } from 'react-bootstrap';
import useCategory from '../../hooks/useCategory';
import styles from './CatalogPage.module.css'; // Подключаем файл CSS модуля
import ProductCard from '../../ui/Cards/ProductCard/ProductCard';

function truncateToSentence(text: string) {
  const match = text.match(/(.*?\.)(\s|$)/);
  return match ? match[1] : text;
}

export default function CatalogPage() {
  const products = useCategory();
  console.log(products);
  return (
    <Row>
      <Col md={6} className={styles.imageCol}>
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${products[3]?.product?.masterVariant?.images?.[0]?.url ?? ''})` }}
        >
          <div className={styles.content}>
            <h2>Catalog</h2>
          </div>
        </div>
      </Col>
      <Col md={6}>
        <Row className={styles.catalogGrid}>
          {products.map((product) => {
            const imageLink = product.product?.masterVariant?.images?.[0]?.url ?? '';
            const description = truncateToSentence(product.product?.description?.['en-GB'] ?? '');
            const name = product.product?.name?.['en-GB'] ?? '';
            return (
              <ProductCard
                name={name}
                imageLink={imageLink}
                description={description}
                id={product.product?.id}
                price="100 EUR"
                discountPrice="150 EUR"
              />
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}
