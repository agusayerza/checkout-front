describe("The main page", () => {
  it("Succesfully loads", () => {
    cy.visit("http://localhost:3000/");
  });
  it("Next moves to address input page", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".btn.btn-primary").click();
    cy.get("label.form-label")
      .eq(0)
      .should("contain.text", "Código postal");
    cy.get("label.form-label")
      .eq(1)
      .should("contain.text", "Localidad");
    cy.get("label.form-label")
      .eq(2)
      .should("contain.text", "Calle");
  });
});

describe("The address input page", () => {
  it("Input works properly", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".btn.btn-primary").click();
    cy.get("input#postal")
      .type("1629")
      .should("have.value", "1629");
    cy.get("input#province-local")
      .type("CABA")
      .should("have.value", "CABA");
    cy.get("input#street")
      .type("Balcarce 50")
      .should("have.value", "Balcarce 50");
  });
});

describe("The payment input page", () => {
  it("Input works properly", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".btn.btn-primary").click();
    cy.get(".btn.btn-primary").click();
    cy.get("select#installments").should("not.have.descendants");
    cy.get("input#cardNumber")
      .type("3711 8030 3257 522")
      .should("have.value", "3711 8030 3257 522");
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
      .type("123456789")
      .should("have.value", "123456789");
    cy.get("input#email")
      .type("no-reply@gmail.com")
      .should("have.value", "no-reply@gmail.com");
    cy.get("select#installments")
      .select("1 cuota de $ 819,00 ($ 819,00)")
      .should("have.value", 1);
    cy.get("select#installments")
      .select("6 cuotas de $ 200,42 ($ 1.202,52)")
      .should("have.value", 6);
  });
  it("It navigates", () => {
    cy.get(".btn.btn-primary").click();
  });
  it("Show success message", () => {
    cy.get("div#success_msg").should("not.have.descendants");
  });
});
