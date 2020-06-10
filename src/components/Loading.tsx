import React from "react";
import { Container, Col, Row, Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Row className="justify-content-md-center">
            <Spinner animation="border"></Spinner>
          </Row>
          <Row className="justify-content-md-center">
            <div>Loading...</div>
          </Row>
        </Col>
      </Row>
    </Container>);
}
