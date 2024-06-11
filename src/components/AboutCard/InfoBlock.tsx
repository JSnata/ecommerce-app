import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';

interface PersonalData {
  style: string;
  fio: string;
  post: string;
  bio: string;
  gitHub: string;
}

export default function InfoBlock(props: PersonalData) {
  const { style, fio, post, bio, gitHub } = props;
  return (
    <Col
      className={`d-flex flex-column justify-content-sm-around align-items-center ${style} text-center`}
      xs={12}
      md={6}
    >
      <Row>
        <Row>
          <h3>{fio}</h3>
        </Row>
        <Row>
          <p>{post}</p>
        </Row>
      </Row>
      <Row>
        <p>{bio}</p>
      </Row>
      <Row>
        <a href={gitHub} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
          <Github color="black" size={40} />
        </a>
      </Row>
    </Col>
  );
}
