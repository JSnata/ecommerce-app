import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';

interface PersonalData {
  style: string;
  fio: string;
  post: string;
  bio: string;
  did: string;
  gitHub: string;
}

export default function InfoBlock(props: PersonalData) {
  const { style, fio, post, bio, did, gitHub } = props;
  return (
    <Col
      className={`d-flex flex-column justify-content-sm-around align-items-center ${style} text-center`}
      xs={12}
      md={6}
    >
      <Row className="justify-content-center">
        <Row>
          <h3>{fio}</h3>
        </Row>
        <Row>
          <p>{post}</p>
        </Row>
      </Row>
      <Row className="justify-content-center">
        <Col sm={10}>
          <p>{bio}</p>
        </Col>
      </Row>
      <Row>
        <p>
          <b>I did</b>: {did}
        </p>
      </Row>
      <Row>
        <a href={gitHub} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
          <Github color="black" size={40} />
        </a>
      </Row>
    </Col>
  );
}
