import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CarouselComponent from '../../ui/Carusel/Carusel';
import style from './ProductPage.module.css';
import useProducts from '../../hooks/useProducts';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

interface ProductParam {
  id: string;
}

function ProductPage() {
  const productId: ProductParam = useParams();
  const products = useProducts();
  const product = products.find((prod) => prod.id === productId.id);
  const productImages = product?.masterData?.current?.masterVariant?.images;
  const productSrcArray: (string | undefined)[] = [];
  productImages?.forEach((img) => {
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
            <h2>{productPriceCurr?.toLocaleString()}$</h2>
          </Row>
          <Row>
            <h3 className={style.oldPrice}>{productPriceStaged?.toLocaleString()}$</h3>
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
