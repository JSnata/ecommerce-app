import React from 'react';
import { Carousel, Image } from 'react-bootstrap';

interface CarouselData {
  srcArray: Array<string | undefined>;
  interval: null | number;
  id: undefined | string;
  imgClassName?: string;
}

function CarouselComponent(props: CarouselData) {
  const { srcArray, interval, id, imgClassName } = props;
  const getKeyByIndex = (index: number) => `${id}-${index}`;
  return (
    <Carousel interval={interval} data-bs-theme="dark" controls={srcArray.length > 1} indicators={srcArray.length > 1}>
      {srcArray.map((src, index) => (
        <Carousel.Item key={getKeyByIndex(index)}>
          <Image src={src} className={imgClassName} alt="Product photo" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
