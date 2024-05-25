import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import style from './Carousel.module.css';

interface CarouselData {
  srcArray: Array<string | undefined>;
  interval: null | number;
  id: undefined | string;
}

function CarouselComponent(props: CarouselData) {
  const { srcArray, interval, id } = props;
  const getKeyByIndex = (index: number) => (id ? `${id}-${index}` : index);
  return (
    <Carousel interval={interval} data-bs-theme="dark">
      {srcArray.map((src, index) => (
        <Carousel.Item key={getKeyByIndex(index)}>
          <Image src={src} className={style.img} alt="Product photo" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
