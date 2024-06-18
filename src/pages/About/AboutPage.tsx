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
                  sections for specific occasions, and Trello helps us manage tasks. Throughout all 7 weeks, we actively
                  helped each other, suggested and advised useful things to implement. Each team member did both the
                  layout and logic of the pages. If difficulties arose, everyone could work on the page together. Thus,
                  we have a beautiful, functional commercial website example.
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
            bio="Originally from the Republic of Belarus, I currently reside in Poland. With a background in SEO, I am now focused on enhancing my English proficiency and completing a course to transition into a frontend developer role. I am eager to leverage my skills and embark on a new career path in frontend development."
            did="Api connect, router, catalog page, header, filter products"
            gitHub="https://github.com/jsnata"
          />
        </Row>
        <Row className={style.row}>
          <InfoBlock
            style={style.infoIlya}
            fio="Ilya Slepchenkov"
            post="Frontend developer"
            bio="I live in Zelenograd, Moscow, and work as a microelectronics engineer. At my job, there was a need for customer service development, which led me to programming. I started by self-studying PHP, JavaScript, CSS, and HTML, and then continued my education at RS School. During my studies, I realized that programming is exactly what I want to do. In the future, after completing my education at RS School, I plan to develop in the areas of frontend and backend development using Node.js to create efficient and modern web applications."
            gitHub="https://github.com/linderjk"
            did="Commerce tools API, main page, cart, profile, basket page"
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
            bio="I'm from Moscow. Since high school, I wanted to work in the IT field, but I could not decide on the direction. I went to the institute in the direction of 'applied informatics'. I studied for 4 years and got a diploma. I started working as a database designer and developer, but this is not what I would like to do all my life. I realized that I liked JavaScript and began to delve into its study, got into RS School and now I'm trying to live to the end of the stage."
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
