/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Col, Row, Dropdown } from 'react-bootstrap'

type ShippingOptionsProps = {
  setShippingCost(cost: number): number
}

export const ShippingOptions = ({ setShippingCost }: ShippingOptionsProps) => {

  const [province, setProvince] = useState("Provincia")

  return (
    <Form>
      <Form.Group controlId="postal">
        <Form.Label>Código postal</Form.Label>
        <Form.Control placeholder="Código postal" />
        {/* <Form.Text className="text-muted"> 
        </Form.Text> */}
      </Form.Group>
      <Form.Group controlId="province-local">
        <Row>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {province}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setProvince("Buenos Aires")}>Buenos Aires</Dropdown.Item>
              <Dropdown.Item onClick={() => setProvince("Mendoza")}>Mendoza</Dropdown.Item>
              <Dropdown.Item onClick={() => setProvince("En la copa")}>En la copa</Dropdown.Item>
              <Dropdown.Item onClick={() => setProvince("Europa")}>Europa</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Form.Label>Localidad</Form.Label>
          <Form.Control placeholder="Localidad" />
        </Row>
      </Form.Group>
      <Form.Group controlId="street">
        <Form.Label>Calle</Form.Label>
        <Form.Control placeholder="Calle" />
        <Form.Text className="text-muted">
          Incluir piso/departamento de ser necesario.
        </Form.Text>
      </Form.Group>
    </Form >
  )
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(ShippingOptions)
export default (ShippingOptions)