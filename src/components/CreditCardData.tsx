import React, { useState, useEffect, Fragment, FocusEvent } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Cards, { Focused } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Payment, User, SaleDto } from "../model"
import { MPInstallmentsResponse, MPMethodIdResponse } from '../model/MercadoPago'
import { api, post } from "../utils/api";
type CreditCardDataProps = {
  me: User,
  checkoutId: number,
  back(): void,
  next(): void,
  cost: number
}

type Installments = {
  installments: number,
  recommended_message: string
}

const CreditCardData = ({ checkoutId, me, cost, back, next }: CreditCardDataProps) => {

  const [cardNumber, setCardNumber] = useState<string>("")
  const [cardName, setCardName] = useState<string>("")
  const [paymentMethodId, _setPaymentMethodId] = useState<string>();
  const [installments, setInstallments] = useState<Installments[]>([]);
  const [installmentNumber, setInstallmentNumber] = useState<number>();
  const [email, setEmail] = useState<string>("");
  const [doSubmit, setDoSubmit] = useState<Boolean>(false);
  const [cvc, setCVC] = useState<string>("");
  const [focus, setFocus] = useState<Focused>();
  const [expiry, setExpiry] = useState<string>("");
  const [expiryMonth, setExpiryMonth] = useState<string>("");
  const [expiryYear, setExpiryYear] = useState<string>("");
  const [issuerId, setIssuerId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<any>(null);

  useEffect(() => {
    window.Mercadopago.setPublishableKey("TEST-c6c5ce57-514c-4dd0-ae64-7a280781bc25");
    window.Mercadopago.getIdentificationTypes();
  }, []);

  useEffect(() => {
    if (expiryMonth && expiryYear) setExpiry(expiryMonth + expiryYear);
  }, [expiryMonth, expiryYear])

  useEffect(() => {
    guessPaymentMethod();
  }, [cardNumber]);

  function guessPaymentMethod() {
    if (cardNumber.length >= 6) {
      let bin = cardNumber.substring(0, 6);
      window.Mercadopago.getPaymentMethod({
        "bin": bin
      }, setPaymentMethod);
    } else {
      setInstallments([]);
    }
  };

  function setPaymentMethod(status: number, response: MPMethodIdResponse[]) {
    if (status == 200) {
      let paymentMethodId = response[0].id;
      _setPaymentMethodId(paymentMethodId);
    } else {
      console.log(`payment method info error: ${JSON.stringify(response)}`);
    }
  }

  useEffect(() => {
    if (paymentMethodId) getInstallments();
  }, [paymentMethodId])



  function getInstallments() {
    window.Mercadopago.getInstallments({
      "payment_method_id": paymentMethodId,
      "amount": parseFloat(cost + "")
    }, function (status: number, response: MPInstallmentsResponse[]) {
      console.log("New installments");
      if (status == 200) {
        let installments = response[0].payer_costs;
        setInstallments(installments);
        setInstallmentNumber(1);
        let issuer_id = response[0].issuer.id;
        console.log("Issuer: " + issuer_id);
        setIssuerId(issuer_id);
      } else {
        console.log(`installments method info error: ${response}`);
      }
    });
  }

  function doPay() {
    setErrorMessage(null);
    if (!doSubmit) {
      var $form = document.querySelector('#pay');
      window.Mercadopago.createToken($form, sdkResponseHandler);

      return false;
    }
  };

  function changeFocus(e: FocusEvent<HTMLInputElement>) {
    const { name } = e.target as HTMLInputElement;
    console.log(name + " focused, " + name as Focused)
    setFocus(name as Focused)
  }

  function sdkResponseHandler(status: number, response: { id: string }) {
    console.log("Response from MP")
    if (status != 200 && status != 201) {
      alert("Invalid form data");
    } else {
      let payment: Payment = { userId: me.id, checkoutId: checkoutId };
      payment.transaction_amount = cost;
      payment.token = response.id;
      payment.payment_method_id = paymentMethodId;
      payment.installments = 1;
      payment.payer = { email: email };
      payment.description = "Description";
      payment.issuerId = issuerId;
      console.log(JSON.stringify(payment));

      post<Payment, SaleDto>("http://localhost:8080/sales", payment).then(sale => {
        console.log(sale);

        if (sale.success) {
          next();
        } else {
          setErrorMessage(sale.message);
          // limpiar sesión para poder  volver a crear un payment.
          window.Mercadopago.clearSession();
        }
      });
    }
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focus}
            name={cardName}
            number={cardNumber}>
          </Cards></Col>
        <Col>
          <form action="" method="post" id="pay" name="pay" >
            <fieldset>
              <p>
                <Col>Número de la tarjeta</Col>
                <Col><input type="text" id="cardNumber" data-checkout="cardNumber"
                  name="number" onFocus={e => changeFocus(e)} value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                </Col>
              </p>
              <p>
                <Col>Nombre y apellido</Col>
                <Col><input type="text" id="cardholderName" data-checkout="cardholderName"
                  name="name" onFocus={e => changeFocus(e)} value={cardName} onChange={e => setCardName(e.target.value)} /></Col>
              </p>
              <Row className="mt-1">
                <Col>Vencimiento</Col>
                <Col>
                  <input type="text" maxLength={2} className="short" id="cardExpirationMonth" onChange={e => setExpiryMonth(e.target.value)}
                    data-checkout="cardExpirationMonth" name="expiry" onFocus={e => changeFocus(e)} value={expiryMonth} />
                  /
                  <input type="text" maxLength={2} className="short" id="cardExpirationYear" onChange={e => setExpiryYear(e.target.value)}
                    data-checkout="cardExpirationYear" name="expiry" onFocus={e => changeFocus(e)} value={expiryYear} />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col>Código de seguridad</Col>
                <Col><input name="cvc" maxLength={4} onFocus={e => changeFocus(e)}
                  onChange={e => setCVC(e.target.value)} type="text" id="securityCode" value={cvc} data-checkout="securityCode" />
                </Col>
              </Row>
              <p>
                <Col>Cuotas</Col>
                <Col><select id="installments" className="form-control" name="installments" onChange={e => setInstallmentNumber(+e.target.value)}>
                  {installments.map(installment => {
                    return (<option key={installment.installments} value={installment.installments}>
                      {installment.recommended_message}
                    </option>)
                  })}
                </select></Col>
              </p>
              <Row className="mt-1">
                <Col>Tipo de documento</Col>
                <Col><select id="docType" data-checkout="docType"></select></Col>
              </Row>
              <p>
                <Col>Número de documento</Col>
                <Col><input type="text" id="docNumber" data-checkout="docNumber" /></Col>
              </p>
              <p>
                <Col>Email</Col>
                <Col><input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} /></Col>
              </p>
              <Col><input type="hidden" name="payment_method_id" id="payment_method_id" value={paymentMethodId} /></Col>
            </fieldset>
          </form >
          <Col>
            <Row className="justify-content-center">A pagar: ${cost}</Row>
          </Col>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        {errorMessage ? <div id="backend-error">{errorMessage}</div> : <Fragment></Fragment>}
      </Row>
      <div className="mt-auto buttons">
        <Row>
          <Col><Button variant="light" onClick={back}>Back</Button></Col>
          <Col><Button variant="primary" onClick={doPay}>Pay</Button></Col>
        </Row>
      </div>
    </Fragment>
  );
}

export default CreditCardData;
