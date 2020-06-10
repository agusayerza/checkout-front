import React from 'react'
import { Address, User, Delivery, Item } from 'model';
import { Row, Table, Col } from 'react-bootstrap';

type ShippingCostOptions = {
  address: Address;
  deliveryCost: Delivery[];
  items: Item[];
  me: User;
};

type SimpleDelivery = {
  id: number;
  deliveryCost: number;
  productDto: {
    id: number;
  }
}

export const ShippingCost = ({
  address,
  deliveryCost,
  items,
  me,
}: ShippingCostOptions) => {


  function findDeliveryForProductId(productId: number): SimpleDelivery {
    const findOrFail: Delivery | undefined = deliveryCost.find(d => d.productDto.id == productId)
    return findOrFail ? findOrFail : { id: -1, deliveryCost: -1, productDto: { id: -1 } } as SimpleDelivery;
  }

  return (
    <Row>
      <Table>
        <thead>
          <th>Product</th>
          <th>From</th>
          <th>To</th>
          <th>Cost</th>
        </thead>
        <tbody>
          {deliveryCost.map(delivery => {
            return (
              <tr>
                <td>{delivery.productDto.productName}</td>
                <td>{delivery.productDto.addressDto.cityName + ", " + delivery.productDto.addressDto.province}</td>
                <td>{delivery.toDto.cityName + ", " + delivery.toDto.province}</td>
                <td>${delivery.deliveryCost}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Table>
        <Row>
          <Col>Total: </Col>
          <Col id="total-delivery-cost">${deliveryCost.map(d => d.deliveryCost).reduce((a, b) => { return a + b; })}</Col>
        </Row>
      </Table>
    </Row>
  )
}
