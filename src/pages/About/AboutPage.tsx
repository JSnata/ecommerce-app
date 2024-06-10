import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import style from './About.module.css';
import Sofa from '../../assets/img/Sofia.jpeg';

export default function AboutPage() {
  return (
    <Row>
      <Col>
        <Row className={`${style.title} ${style.row}`}>
          <Col>
            <Row className={style.row}>
              <Col className="d-flex justify-content-center">
                <h1>Our story</h1>
              </Col>
            </Row>
            <Row className={style.row}>
              <Col className="d-flex justify-content-center">
                <p>Text text text text text text text about our team</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Image src={Sofa} alt="Sofia Sharshunskaya" fluid />
          </Col>
          <Col className="d-flex flex-column justify-content-center">
            <Row>
              <h3>Sofia Sharshunskaya</h3>
            </Row>
            <Row>
              <p>Frontend developer</p>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
