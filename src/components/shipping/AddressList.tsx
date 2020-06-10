import React, { Fragment } from 'react'
import { Col, Row, Dropdown } from 'react-bootstrap';
import { Address, User } from 'model';
type AdressListOptions = {
  address: Address;
  setAddress(address: Address): void;
  me: User;
};

export const AddressList = ({
  address,
  setAddress,
  me,
}: AdressListOptions) => {
  return (
    <Fragment>
      <Col>
        <Row className="justify-content-center">
          <Col id="select-address-text">Select on of your addresses: </Col>
          <Col>
            <Dropdown id="address">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {address.streetName + " " + address.height + ", " + address.cityName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {me.addresses.map((add) => {
                  return (
                    <Dropdown.Item onClick={() => setAddress(add)} title={add.streetName} key={add.id}>
                      {add.streetName + " " + add.height + ", " + add.cityName}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Col>
    </Fragment>
  )
}
