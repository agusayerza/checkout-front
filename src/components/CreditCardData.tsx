/* eslint-disable */
import React, { useState, useEffect } from 'react'

type CreditCardDataProps = {
  cost: number
}

const CreditCardData = ({ cost }: CreditCardDataProps) => {

  const [step, setStep] = useState(1);
  const [cardNumber, setCardNumber] = useState("")
  const [paymentMethodId, _setPaymentMethodId] = useState();
  const [installments, setInstallments] = useState();
  useEffect(() => {
    window.Mercadopago.getIdentificationTypes();
  });

  useEffect(() => {
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
    if (status == 200) {
      let paymentMethodId = response[0].id;
      _setPaymentMethodId(paymentMethodId);
      getInstallments();
    } else {
      alert(`payment method info error: ${JSON.stringify(response)}`);
    }
  }

  function getInstallments() {
    window.Mercadopago.getInstallments({
      "payment_method_id": paymentMethodId,
      "amount": parseFloat(cost + "")
    }, function (status: number, response: { payer_costs: any[]; }[]) {
      if (status == 200) {
        let installments = response[0].payer_costs;
        console.log(installments);
        // setInstallments(installments)
      } else {
        alert(`installments method info error: ${response}`);
      }
    });
  }

  return (
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
          <select id="installments" className="form-control" name="installments">
            opt.text = installment.recommended_message;
            opt.value = installment.installments;
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
          <input type="email" id="email" name="email" />
        </p>
        <input type="hidden" name="payment_method_id" id="payment_method_id" />
      </fieldset>
    </form>

  );
}

export default CreditCardData;
