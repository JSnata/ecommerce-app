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
          <Col className="d-flex flex-column text-center p-5">
            <Row className={style.row}>
              <Col>
                <h1>Our story</h1>
              </Col>
            </Row>
            <Row className={`justify-content-center ${style.row}`}>
              <Col sm={10}>
                <p>
                  The team was assembled from participants whom the mentor chose as his wards. Since February, we began
                  to communicate a lot and help each other with individual tasks. When it came time to assemble teams
                  for a group project, we did not hesitate to form a team. Our communication is set up well, Discord has
                  sections for specific occasions, and Trello helps us manage tasks.
                </p>
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
            bio="I’m from the Republic of Belarus, but now I live in Poland, while it’s difficult to get a normal job, before moving I worked as an SEO, now I’m learning English and taking this course to gain courage and finally go look for an offer. I decided to temporarily put my hobby aside and kick myself to study and do more business, although in quiet times I did drawing, I love books and walks, mountains and much more)"
            did="Api connect, router, catalog page, header, "
            gitHub="https://github.com/jsnata"
          />
        </Row>
        <Row className={style.row}>
          <InfoBlock
            style={style.infoIlya}
            fio="Ilya Slepchenkov"
            post="Frontend developer"
            bio="I work in Moscow (Zelenograd) as an engineer in the field of microelectronics and study at rsschool, but there is no time for the rest. Hobbies like most: books, TV series, some games, longboard."
            did="Api connect, main page, basket page"
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
            bio="I work in Moscow. Since high school, I wanted to work in the IT field, but I could not decide on the direction. I went to the institute in the direction of 'applied informatics'. I studied for 4 years and got a diploma. I started working as a database designer and developer, but this is not what I would like to do all my life. I realized that I liked JavaScript and began to delve into its study, got into RS School and now I'm trying to live to the end of the stage."
            did="Login/Register page, product page, page about, validation logig"
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
