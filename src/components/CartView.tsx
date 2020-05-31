/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Items } from './types'
import { Row, Col, Button } from 'react-bootstrap';
type CartViewProps = {
  back(): void,
  next(): void,
  items: Items[]
}

export const CartView = ({ items, back, next }: CartViewProps) => {
  return (
    <div>
      {items.map(item => {
        return (
          <Row key={item.id}>
            <Col className="image">
              {item.id}
            </Col>
            <Col >
              <Row className="h2 text-left">
                {item.title}
              </Row>
              <Row className="h6 text-left">
                {item.desc}
              </Row>
            </Col>
            <Col className="image">
              ${item.price}
            </Col>
          </Row>)
      })}
      <Row>
        <Col><Button variant="light" onClick={back}>Back</Button></Col>
        <Col><Button variant="primary" onClick={next}>Next</Button></Col>
      </Row>
    </div >
  )
}


export default (CartView)
