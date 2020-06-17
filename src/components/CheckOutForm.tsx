/* eslint-disable */
import React, { useEffect, useRef, useState, Fragment } from "react";
import { CartView } from "./CartView";
import { Button, Col, Row, Container } from "react-bootstrap";
import { ShippingOptions } from "./ShippingOptions";
import CreditCardData from "./CreditCardData";
import { CartState, Items } from "./types";
import PaymentSuccessful from "./PaymentSuccessful";
import Loading from "./Loading";
import { User, Address, Product, Item, Checkout, ProductDto } from "../model";
import { api } from "../utils/api";

const CheckOutForm: React.FC = () => {

  const [step, setStep] = useState(1);
  const [shippingCost, _setShippingCost] = useState(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const [me, setMe] = useState<User>();
  const [items, setItems] = useState<Item[]>([]);
  const [checkout, setCheckout] = useState<Checkout>();
  const [total, setTotal] = useState<number>(0);

  const setShippingCost = (newCost: number): number => {
    _setShippingCost(newCost);
    return total + newCost;
  };

  useEffect(() => {
    if (me && items) setLoading(false);
  }, [me, items]);

  useEffect(() => {
    api<User>("http://localhost:8080/users/me")
      .then((u) => {
        setMe(u);
      })
      .catch((e) => {
        console.log(e);
      });

    api<ProductDto>("http://localhost:8080/products/5").then(
      (product) => {
        const productTransformed = [{
          name: product.productName,
          id: product.id,
          desc:
            "Arc Reactor is a device initially designed by Howard Stark, and later adapted by his son, Tony, which has an energy output of 8 gigajoules per second."
        }];
        setItems(productTransformed);
        // setTotal(productTransformed.map(a => { return a.value }).reduce((a, b) => { return a + b }));
        setTotal(0)
      }
    );
  }, []);

  const pressedNext = () => {
    setStep(step + 1);
  };

  const pressedBack = () => {
    if (step > 1)
      setStep(step - 1);
  };

  return (
    <Fragment>
      <Container className="main-container container-own">
        <Row className="justify-content-md-center">
          <Col md={"auto"}>
            {loading == true ? (
              <Loading />
            ) : step == 1 && me && items ? (
              <CartView items={items} me={me} next={pressedNext} back={pressedBack} />
            ) : step == 2 && me ? (
              <ShippingOptions
                items={items}
                setCheckout={setCheckout}
                _setShippingCost={setShippingCost}
                next={pressedNext}
                back={pressedBack}
                me={me}
              />
            ) : step == 3 && me && checkout ? (
              <CreditCardData
                me={me}
                checkoutId={checkout.id}
                cost={total + shippingCost}
                next={pressedNext}
                back={pressedBack}
              />
            ) : step == 4 && me ? (
              <PaymentSuccessful />
            ) : (
                        <Loading />
                      )}</Col></Row></Container>
    </Fragment>
  );
};

export default CheckOutForm;
