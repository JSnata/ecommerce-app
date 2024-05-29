import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CarouselComponent from '../../ui/Carusel/Carusel';
import style from './ProductPage.module.css';
import useProducts from '../../hooks/useProducts';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

function ProductPage() {
  const products = useProducts();
  const product = products[0];
  const productId = product?.id;
  const images = product?.masterData?.current?.masterVariant?.images;
  const productSrcArray: (string | undefined)[] = [];
  images?.forEach((img) => {
    productSrcArray.push(img?.url);
  });
  const productName = product?.masterData?.current?.name?.['en-GB'];
  const productDescription = product?.masterData?.current?.description?.['en-GB'];
  const productPriceCurr = product?.masterData?.current?.masterVariant?.prices?.[1]?.value?.centAmount;
  const productPriceStaged = product?.masterData?.staged?.masterVariant?.prices?.[1]?.value?.centAmount;
  const [showModal, setShowModal] = useState(false);

  const openModal = (event: React.MouseEvent<HTMLElement>) => {
    const targetElement = event.target as HTMLElement;
    if (targetElement.tagName === 'IMG') {
      setShowModal(true);
    }
  };
  const handleClose = () => setShowModal(false);

  console.log(product);
  return (
    <div>
      <Row>
        <Col sm={12} md={6} className={`${style.col} ${style.left}`} onClick={openModal}>
          <CarouselComponent srcArray={productSrcArray} interval={null} id={productId} imgClassName={style.imgPage} />
        </Col>
        <Col sm={12} md={6} className={`${style.col} ${style.right}`}>
          <Row>
            <Col>
              <h2 className={style.name}>{productName}</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{productDescription}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>{productPriceCurr?.toLocaleString()}$</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className={style.oldPrice}>{productPriceStaged?.toLocaleString()}$</h3>
            </Col>
          </Row>
        </Col>
      </Row>
      {showModal && (
        <ModalWindow show={showModal} handleClose={handleClose} modalSize="lg">
          <CarouselComponent srcArray={productSrcArray} interval={null} id={productId} imgClassName={style.imgModal} />
        </ModalWindow>
      )}
    </div>
  );
}

export default ProductPage;
