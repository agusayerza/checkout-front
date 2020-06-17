describe("Mercado pago possible outcomes", () => {
  it("Mercado Pago rejects", () => {
    cy.visit("http://localhost:3000/cart");
    cy.get(".btn.btn-primary").click();
    cy.get(".btn.btn-primary").click();
    cy.get("input#cardNumber")
      .type("3711 8030 3257 522")
      .should("have.value", "3711 8030 3257 522");
    cy.wait(500);
    cy.get("input#cardholderName")
      .type("FUND")
      .should("have.value", "FUND");
    cy.get("input#cardExpirationMonth")
      .type("11")
      .should("have.value", "11");
    cy.get("input#cardExpirationYear")
      .type("25")
      .should("have.value", "25");
    cy.get("input#securityCode")
      .type("1234")
      .should("have.value", "1234");
    cy.get("input#docNumber")
      .type("40719053")
      .should("have.value", "40719053");
    cy.get("input#email")
      .type("noreply@gmail.com")
      .should("have.value", "noreply@gmail.com");
    cy.get("select#installments")
      .select("1 cuota de $ 50,00 ($ 50,00)")
      .should("have.value", 1);
    cy.get(".btn.btn-primary").click();
    cy.wait(3000) // wait for 3 seconds
    cy.get("div#backend-error").should("be.visible").should("have.text", "Payment not approved. Status was rejected");
  });

  it("Mercado Pago approves", () => {
    cy.visit("http://localhost:3000/cart");
    cy.get(".btn.btn-primary").click();
    cy.get(".btn.btn-primary").click();
    cy.get("input#cardNumber")
      .type("3711 8030 3257 522")
      .should("have.value", "3711 8030 3257 522");
    cy.wait(500);
    cy.get("input#cardholderName")
      .type("APRO")
      .should("have.value", "APRO");
    cy.get("input#cardExpirationMonth")
      .type("11")
      .should("have.value", "11");
    cy.get("input#cardExpirationYear")
      .type("25")
      .should("have.value", "25");
    cy.get("input#securityCode")
      .type("1234")
      .should("have.value", "1234");
    cy.get("input#docNumber")
      .type("40719053")
      .should("have.value", "40719053");
    cy.get("input#email")
      .type("noreply@gmail.com")
      .should("have.value", "noreply@gmail.com");
    cy.get("select#installments")
      .select("1 cuota de $ 50,00 ($ 50,00)")
      .should("have.value", 1);
    cy.get(".btn.btn-primary").click();
    cy.get("div#backend-error").should("not.exist");
    cy.wait(3000) // wait for 3 seconds
    cy.get("div#success_msg").should("be.visible");
    cy.get("div#backend-error").should("not.exist");
  });

  it("Mercado Pago reject and then retry", () => {
    cy.visit("http://localhost:3000/cart");
    cy.get(".btn.btn-primary").click();
    cy.get(".btn.btn-primary").click();
    cy.get("input#cardNumber")
      .type("3711 8030 3257 522")
      .should("have.value", "3711 8030 3257 522");
    cy.wait(500);
    cy.get("input#cardholderName")
      .type("FUND")
      .should("have.value", "FUND");
    cy.get("input#cardExpirationMonth")
      .type("11")
      .should("have.value", "11");
    cy.get("input#cardExpirationYear")
      .type("25")
      .should("have.value", "25");
    cy.get("input#securityCode")
      .type("1234")
      .should("have.value", "1234");
    cy.get("input#docNumber")
      .type("40719053")
      .should("have.value", "40719053");
    cy.get("input#email")
      .type("noreply@gmail.com")
      .should("have.value", "noreply@gmail.com");
    cy.get("select#installments")
      .select("1 cuota de $ 50,00 ($ 50,00)")
      .should("have.value", 1);
    cy.get(".btn.btn-primary").click();
    cy.wait(3000) // wait for 3 seconds
    cy.get("div#backend-error")
      .should("be.visible")
      .should("have.text", "Payment not approved. Status was rejected");
    cy.get("input#cardholderName")
      .type("{backspace}{backspace}{backspace}{backspace}APRO")
      .should("have.value", "APRO");
    cy.get(".btn.btn-primary").click();
    cy.get("div#backend-error").should("not.exist");
      cy.wait(3000) // wait for 3 seconds
      cy.get("div#success_msg").should("be.visible");
  });

});