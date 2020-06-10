import React, { Fragment } from "react";
import Check from "../img/checkout.png";
import { Col, Row } from "react-bootstrap";
export default function PaymentSuccessful() {
  return (
    <Row className="justify-content-md-center">
      <Col md="auto">
        <Row className="justify-content-md-center">
          <Row sm={4} className="justify-content-md-center">
            <img src={Check} />
          </Row>
        </Row>
        <Row className="justify-content-md-center" id="success_msg">Pago realizado</Row>
      </Col>
    </Row>
  );
}
