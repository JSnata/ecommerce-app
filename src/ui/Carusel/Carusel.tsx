import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import style from './Carousel.module.css';

interface CarouselData {
  src: string | undefined;
}

function CarouselComponent(props: CarouselData) {
  const { src } = props;
  return (
    <Carousel>
      <Carousel.Item>
        <Image src={src} className={style.img} alt="Product photo" />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
