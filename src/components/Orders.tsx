import React, { useEffect, useState, Fragment } from 'react'
import { api } from 'utils/api';
import { User, Order, FullCheckout } from 'model';
import { Table, Row, Container, Col } from 'react-bootstrap';
import OrderComponent from './OrderComponent';
import Loading from './Loading';

export default function Orders() {

  const [me, setMe] = useState<User>();
  const [checkouts, setCheckouts] = useState<FullCheckout[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    api<User>("http://localhost:8080/users/me")
      .then((u) => {
        console.log("New me: " + JSON.stringify(u));
        setMe(u);
      })
      .catch((e) => {
        console.log(e);
      });// /sales/user/{me.id} -> /checkout/{id} -> /valued-products/{id}
  }, [])


  useEffect(() => {
    if (!me) return;
    api<Order[]>("http://localhost:8080/sales/user/" + me.id)
      .then((u) => {
        console.log("New orders: " + JSON.stringify(u));
        setOrders(u);
      })
      .catch((e) => {
        console.log(e);
      });// /sales/user/{me.id} -> /checkout/{id} -> /valued-products/{id}
  }, [me])


  useEffect(() => {
    if (!orders) return;
    orders.forEach(order => {
      api<FullCheckout>("http://localhost:8080/checkout/" + order.checkOutId)
        .then((u) => {
          console.log("New order: " + JSON.stringify(u));
          setCheckouts(oldArray => [...oldArray, u]);
          setLoaded(true);
        })
        .catch((e) => {
          console.log(e);
        });
    });

  }, [orders])



  return (
    <Fragment>
      <Container className="main-container container-own">
        <Row className="justify-content-md-center">
          {!loaded ? <Loading /> :
            <Col>
              {checkouts.map(checkout => {
                return (
                  <OrderComponent key={checkout.id} checkout={checkout} />
                )
              })}
            </Col>}
        </Row></Container></Fragment>
  )
}
