import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Counter from "./features/counter/Counter";
import { Provider } from "react-redux";
import store from "./store";
import CheckOutForm from "components/CheckOutForm";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Orders from "components/Orders";
import { Container, Row, Col, Nav } from "react-bootstrap";


declare global {
  interface Window {
    Mercadopago: any;
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Nav id="nav-bar">
            <NavLink className="nav-link" to="/cart" activeClassName='nav-is-active' id="link-cart">
              Cart
              </NavLink>
            <NavLink className="nav-link" to="/" exact={true} activeClassName='nav-is-active' id="link-orders">My orders</NavLink>
          </Nav>
        </header>
        <Switch>
          <div className="main-container container d-flex flex-column">
            <Route path="/cart">
              <CheckOutForm />
            </Route>
            <Route path="/" exact={true} >
              <Orders />
            </Route>
          </div>
        </Switch>
      </div>
    </Provider >
  );
};

export default App;
