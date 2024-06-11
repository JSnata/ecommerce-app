import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import style from './About.module.css';
import Nata from '../../assets/img/Nata.jpg';
import Ilya from '../../assets/img/Ilya.jpg';
import Sofa from '../../assets/img/Sofia.jpg';
import InfoBlock from '../../components/AboutCard/InfoBlock';
import RSlogo from '../../ui/RSlogo/RSlogo';

export default function AboutPage() {
  return (
    <Row className={style.row}>
      <Col>
        <Row className={`border border-1 border-dark ${style.row}`}>
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
        <Row className={style.row}>
          <Col xs={12} md={6} className={style.imgNata}>
            <Image src={Nata} alt="Natallia Kulikouskaya" fluid />
          </Col>
          <InfoBlock
            style={style.infoNata}
            fio="Natallia Kulikouskaya"
            post="Team Lead / Frontend developer"
            bio="Text text text text text Text text text text text Text text text text text Text text text text text"
            gitHub="https://github.com/jsnata"
          />
        </Row>
        <Row className={style.row}>
          <InfoBlock
            style={style.infoIlya}
            fio="Ilya Slepchenkov"
            post="Frontend developer"
            bio="Text text text text text Text text text text text Text text text text text Text text text text text"
            gitHub="https://github.com/linderjk"
          />
          <Col xs={12} md={6} className={style.imgIlya}>
            <Image src={Ilya} alt="Ilya Slepchenkov" fluid />
          </Col>
        </Row>
        <Row className={style.row}>
          <Col xs={12} md={6} className={style.imgSofa}>
            <Image src={Sofa} alt="Sofia Sharshunskaya" fluid />
          </Col>
          <InfoBlock
            style={style.infoSofa}
            fio="Sofia Sharshunskaya"
            post="Frontend developer"
            bio="Text text text text text Text text text text text Text text text text text Text text text text text"
            gitHub="https://github.com/SPHsofi"
          />
        </Row>
        <Row className={`border border-1 border-dark ${style.row}`}>
          <Col className="d-flex justify-content-center">
            <a href="https://rs.school/" aria-label="RS School">
              <RSlogo />
            </a>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
