/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { CartView } from "./CartView";
import { Button, Col, Row } from 'react-bootstrap';
import { ShippingOptions } from "./ShippingOptions";
import CreditCardData from './CreditCardData'
import { CartState, Items } from "./types"

const CheckOutForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [shippingCost, _setShippingCost] = useState(-1);

  const setShippingCost = (newCost: number): number => {
    _setShippingCost(newCost);
    return initState.total + newCost;
  }

  const initState: CartState = {
    items: [
      { id: 1, title: 'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 110 },
      { id: 2, title: 'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 80 },
      { id: 3, title: 'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 120 },
      { id: 4, title: 'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 260 },
      { id: 5, title: 'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 160 },
      { id: 6, title: 'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 90 }
    ],
    total: 820

  }

  const [items, setItems] = useState(initState.items);
  const [total, setTotal] = useState(initState.total);

  const pressedNext = () => {
    setStep(step + 1);
  }

  const pressedBack = () => {
    setStep(step - 1);
  }

  return (<Col className="main-container">
    {step == 1 ? <CartView items={items} next={pressedNext} back={pressedBack} /> :
      step == 2 ? <ShippingOptions setShippingCost={setShippingCost} next={pressedNext} back={pressedBack} /> :
        <CreditCardData cost={initState.total + shippingCost} next={pressedNext} back={pressedBack} />}
    {step}
  </Col>);
};

export default CheckOutForm;
