import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Counter from "./features/counter/Counter";
import { Provider } from "react-redux";
import store from "./store";
import CheckOutForm from "components/CheckOutForm";
import "bootstrap/dist/css/bootstrap.min.css";

declare global {
  interface Window {
    Mercadopago: any;
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header"></header>
        <CheckOutForm />
      </div>
    </Provider>
  );
};

export default App;
