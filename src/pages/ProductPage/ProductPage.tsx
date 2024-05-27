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
  const productSrc1 = product?.masterData?.current?.masterVariant?.images?.[0]?.url;
  const productSrc2 = product?.masterData?.current?.masterVariant?.images?.[1]?.url;
  const productSrc3 = product?.masterData?.current?.masterVariant?.images?.[2]?.url;
  const productName = product?.masterData?.current?.name?.['en-GB'];
  const productDescription = product?.masterData?.current?.description?.['en-GB'];
  const productPrice = product?.masterData?.current?.masterVariant?.prices?.[1]?.value?.centAmount;
  const productSrcArray = [productSrc1, productSrc2, productSrc3];
  const [showModal, setShowModal] = useState(false);

  const openModal = (event: React.MouseEvent<HTMLElement>) => {
    const targetElement = event.target as HTMLElement;
    if (targetElement.tagName === 'IMG') {
      setShowModal(true);
    }
  };
  const handleClose = () => setShowModal(false);

  console.log(products[0]);
  return (
    <div>
      <Row>
        <Col sm={12} md={6} className={`${style.col} ${style.left}`} onClick={openModal}>
          <CarouselComponent srcArray={productSrcArray} interval={null} id={productId} />
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
              <h2>{productPrice?.toLocaleString()}$</h2>
            </Col>
          </Row>
        </Col>
      </Row>
      {showModal && (
        <ModalWindow show={showModal} handleClose={handleClose} modalSize="lg">
          <CarouselComponent srcArray={productSrcArray} interval={null} id={productId} />
        </ModalWindow>
      )}
    </div>
  );
}

export default ProductPage;
