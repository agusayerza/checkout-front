import React, { Fragment } from "react";
import Check from "../img/check.jpg";
import { Col, Row } from "react-bootstrap";
export default function PaymentSuccessful() {
  return (
    <Fragment>
      <Col>
        <Row>{/* <img src={Check} /> */}</Row>
        <Row id="success_msg">Pago realizado</Row>
      </Col>
    </Fragment>
  );
}