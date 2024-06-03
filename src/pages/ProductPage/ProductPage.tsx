import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CarouselComponent from '../../ui/Carusel/Carusel';
import style from './ProductPage.module.css';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import useProducts from '../../hooks/useProducts';

interface ProductParam {
  id: string;
}

function ProductPage() {
  const productId: ProductParam = useParams();
  const products = useProducts();
  const product = products.find((prod) => prod.id === productId.id);
  const productImages = product?.masterVariant?.images;
  const productName = product?.name?.['en-GB'];
  const productDescription = product?.description?.['en-GB'];
  const productPriceCurr = product?.masterVariant?.prices?.[0]?.value?.centAmount;
  const digit = product?.masterVariant?.prices?.[0]?.value?.fractionDigits;
  const productCode = product?.masterVariant?.prices?.[0]?.value?.currencyCode;
  let productPrice = null;
  if (productPriceCurr && digit) {
    productPrice = (productPriceCurr / 10 ** digit).toFixed(digit);
  } else {
    productPrice = 0;
  }

  const productSrcArray: (string | undefined)[] = [];
  productImages?.forEach((img) => {
    productSrcArray.push(img?.url);
  });
  const [showModal, setShowModal] = useState(false);

  const openModal = (event: React.MouseEvent<HTMLElement>) => {
    const targetElement = event.target as HTMLElement;
    if (targetElement.tagName === 'IMG') {
      setShowModal(true);
    }
  };
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Row className={style.row}>
        <Col sm={12} md={6} className={style.left} onClick={openModal}>
          <CarouselComponent
            srcArray={productSrcArray}
            interval={null}
            id={productId.id}
            imgClassName={style.imgPage}
          />
        </Col>
        <Col sm={12} md={6} className={`${style.right} d-flex flex-column justify-content-center p-2`}>
          <Row>
            <h2 className={style.name}>{productName}</h2>
          </Row>
          <Row>
            <p>{productDescription}</p>
          </Row>
          <Row>
            <h2>
              {productPrice} {productCode}
            </h2>
          </Row>
        </Col>
      </Row>
      {showModal && (
        <ModalWindow show={showModal} handleClose={handleClose} title={productName} modalSize="lg">
          <CarouselComponent
            srcArray={productSrcArray}
            interval={null}
            id={productId.id}
            imgClassName={style.imgModal}
          />
        </ModalWindow>
      )}
    </div>
  );
}

export default ProductPage;
