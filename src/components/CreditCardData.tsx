/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

type CreditCardDataProps = {
  back(): void,
  next(): void,
  cost: number
}

type Installments = {
  installments: number,
  recommended_message: string
}

const CreditCardData = ({ cost, back, next }: CreditCardDataProps) => {

  const [cardNumber, setCardNumber] = useState("")
  const [paymentMethodId, _setPaymentMethodId] = useState();
  const [installments, setInstallments] = useState<Installments[]>([]);
  const [installmentNumber, setInstallmentNumber] = useState<number>();
  const [email, setEmail] = useState<string>("");
  const [doSubmit, setDoSubmit] = useState<Boolean>(false);

  useEffect(() => {
    window.Mercadopago.getIdentificationTypes();
  });

  useEffect(() => {
    console.log("Card number: " + cardNumber);
    guessPaymentMethod();
  }, [cardNumber]);

  function guessPaymentMethod() {
    if (cardNumber.length >= 6) {
      let bin = cardNumber.substring(0, 6);
      window.Mercadopago.getPaymentMethod({
        "bin": bin
      }, setPaymentMethod);
    }
  };

  function setPaymentMethod(status: number, response: { id: any; }[]) {
    console.log("New payment method");
    if (status == 200) {
      let paymentMethodId = response[0].id;
      _setPaymentMethodId(paymentMethodId);
    } else {
      alert(`payment method info error: ${JSON.stringify(response)}`);
    }
  }

  useEffect(() => {
    console.log("PymntId: " + paymentMethodId);
    if (paymentMethodId) getInstallments();
  }, [paymentMethodId])


  function getInstallments() {
    window.Mercadopago.getInstallments({
      "payment_method_id": paymentMethodId,
      "amount": parseFloat(cost + "")
    }, function (status: number, response: { payer_costs: Installments[]; }[]) {
      console.log("New installments");
      if (status == 200) {
        let installments = response[0].payer_costs;
        setInstallments(installments);
      } else {
        alert(`installments method info error: ${response}`);
      }
    });
  }

  function doPay() {
    if (!doSubmit) {
      var $form = document.querySelector('#pay');
      window.Mercadopago.createToken($form, sdkResponseHandler);

      return false;
    }
  };

  type Payment = {
    transaction_amount?: number,
    token?: string,
    description?: string,
    installments?: number,
    payment_method_id?: string,
    payer?: {
      email?: string
    }
  }

  function sdkResponseHandler(status: number, response: { id: string }) {
    if (status != 200 && status != 201) {
      alert("Verify filled data");
    } else {
      let payment: Payment = {};
      payment.transaction_amount = cost;
      payment.token = response.id;
      payment.payment_method_id = paymentMethodId;
      payment.installments = installmentNumber;
      payment.payer = { email: email };
      payment.description = "Y pa que quiere saber eso?";
      console.log(payment);

      const postToBack = fetch("http://localhost:8080/payment", {
        method: 'POST',
        body: JSON.stringify(payment),
        headers: { 'Content-Type': 'application/json' }
      }).then(response => {
        console.log(response);
        if (response.ok) next();
      });



    }
  };

  return (
    <div>
      <form action="" method="post" id="pay" name="pay" >
        <p>A pagar: ${cost}</p>
        <fieldset>
          <p>
            <label>Número de la tarjeta</label>
            <input type="text" id="cardNumber" data-checkout="cardNumber" onChange={e => setCardNumber(e.target.value)} />
          </p>
          <p>
            <label>Nombre y apellido</label>
            <input type="text" id="cardholderName" data-checkout="cardholderName" />
          </p>
          <p>
            <label>Mes de vencimiento</label>
            <input type="text" id="cardExpirationMonth" data-checkout="cardExpirationMonth" />
          </p>
          <p>
            <label>Año de vencimiento</label>
            <input type="text" id="cardExpirationYear" data-checkout="cardExpirationYear" />
          </p>
          <p>
            <label>Código de seguridad</label>
            <input type="text" id="securityCode" data-checkout="securityCode" />
          </p>
          <p>
            <label>Cuotas</label>
            <select id="installments" className="form-control" name="installments" onChange={e => setInstallmentNumber(+e.target.value)}>
              {installments.map(installment => {
                return (<option key={installment.installments} value={installment.installments}>
                  {installment.recommended_message}
                </option>)
              })}
            </select>
          </p>
          <p>
            <label>Tipo de documento</label>
            <select id="docType" data-checkout="docType"></select>
          </p>
          <p>
            <label>Número de documento</label>
            <input type="text" id="docNumber" data-checkout="docNumber" />
          </p>
          <p>
            <label>Email</label>
            <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
          </p>
          <input type="hidden" name="payment_method_id" id="payment_method_id" value={paymentMethodId} />
        </fieldset>
      </form >
      <Row>
        <Col><Button variant="light" onClick={back}>Back</Button></Col>
        <Col><Button variant="primary" onClick={doPay}>Pay</Button></Col>
      </Row>
    </div>
  );
}

export default CreditCardData;
