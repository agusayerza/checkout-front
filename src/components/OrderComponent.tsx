import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { type } from 'os'
import { FullCheckout } from 'model'
import { Row, Col, Container } from 'react-bootstrap'

type IProp = {
  checkout: FullCheckout
}

const OrderComponent = (props: IProp) => {
  return (
    <Fragment>
      <Container className="container-own checkout-card">
        <Row>
          <Col>
            <Row>
              <Col>
                <div className="text-left">
                  <h4>Checkout {props.checkout.id}</h4>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <b>Product</b>
              </Col>
              <Col>
                <b>Cost</b>
              </Col>
              <Col>
                <b>Time</b>
              </Col>
            </Row>
            {props.checkout.valuedProductDtosList.map(product => {
              return (
                <Row key={product.id}>
                  <Col>
                    {product.productDto.productName}
                  </Col>
                  <Col>
                    ${product.value}
                  </Col>
                  <Col>
                    {product.dateTime}
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default OrderComponent

