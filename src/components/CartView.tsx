/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Items } from "./types";
import { Row, Col, Button } from "react-bootstrap";
import { User, Item } from "../model";

type CartViewProps = {
  back(): void;
  next(): void;
  me: User | undefined;
  items: Item[];
};

export const CartView = ({ me, items, back, next }: CartViewProps) => {
  return (
    <Fragment>
      <h2>Carrito de {me?.name + " " + me?.surname}</h2>
      <table id="myTable" className="table">
        <tr>
          <th>Product</th>
          <th>Name</th>
          <th>Decription</th>
          <th>Price</th>
        </tr>
        <tbody>
          {items.map((item) => {
            return (
              <Fragment key={item.id}>
                <tr>
                  <td>
                    <div className="product-img">
                      <div className="img-prdct">{item.id}</div>
                    </div>
                  </td>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td>
                    <p>{item.desc}</p>
                  </td>
                  <td align="right">
                    <span id="amount" className="amount">
                      {/*${item.value}*/}
                    </span>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="mt-auto buttons">
        <Row>
          <Col>
            <Button variant="light" onClick={back}>
              Back
            </Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={next}>
              Next
            </Button>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default CartView;
