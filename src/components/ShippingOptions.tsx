/* eslint-disable prettier/prettier */
import React, { Component, useState, Fragment, useEffect } from "react";
import { Form, Button, Col, Row, Dropdown } from "react-bootstrap";
import Loading from "./Loading";
import { User, Address, Delivery, Item, Id, Checkout } from "../model";
import { api, post } from "../utils/api";
import { AddressList } from "./shipping/AddressList";
import { ShippingCost } from "./shipping/ShippingCost";

type ShippingOptionsProps = {
  back(): void;
  next(): void;
  items: Item[];
  me: User;
  _setShippingCost(cost: number): number;
  setCheckout(checkout: Checkout): void;
};

type CreateCart = {
  products: Id[];
  address: Id;
}

export const ShippingOptions = ({
  _setShippingCost,
  setCheckout,
  back,
  next,
  items,
  me,
}: ShippingOptionsProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [evaluating, setEvaluating] = useState<boolean>(true);
  const [deliveryCost, setDeliveryCost] = useState<Delivery[]>([]);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [address, setAddress] = useState<Address>(me.addresses[0]);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (items && address) {
      setEvaluating(true);
      const productsId: Id[] = items.map(p => { return { id: p.id } });
      const cart: CreateCart = {
        products: productsId,
        address: { id: address.id }
      }
      console.log(JSON.stringify(cart));
      post<CreateCart, Checkout>("http://localhost:8080/cart", cart).then((checkout => {
        console.log(checkout);
        const deliveries = checkout.productDeliveryDtoList;
        const shippingCost: number = deliveries.map(d => { return d.deliveryCost }).reduce(function (a: number, b: number) { return a + b; });
        setShippingCost(shippingCost);
        setCheckout(checkout);
        setDeliveryCost(deliveries)
        setEvaluating(false);
      }));

    }
  }, [address]);

  function goNext() {
    _setShippingCost(shippingCost);
    next();
  }

  return (
    <Fragment>
      {loading == true ? (
        <Loading />
      ) : (
          <Fragment>
            <Row className="justify-content-center"><AddressList me={me} setAddress={setAddress} address={address} /></Row>
            <Row className="justify-content-center" ><hr /></Row>
            <Row className="justify-content-center">
              {evaluating ? <Loading /> : <ShippingCost items={items} address={address} me={me} deliveryCost={deliveryCost} />}
            </Row>
            <div className="mt-auto buttons">
              <Row>
                <Col>
                  <Button variant="light" onClick={back}>
                    Back
                </Button>
                </Col>
                <Col>
                  <Button variant="primary" onClick={goNext}>
                    Next
                </Button>
                </Col>
              </Row>
            </div>
          </Fragment>
        )}
    </Fragment>
  );
};
export default ShippingOptions;
