describe("The main page", () => {
  it("Succesfully loads", () => {
    cy.visit("http://localhost:3000/");
  });
  it("Next moves to address input page", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".btn.btn-primary").click();
    cy.get("div#select-address-text")
    .should("contain.text", "Select on of your addresses:");
  });
});

describe("The address input page", () => {
  it("Shows the correct address on the drop down", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".btn.btn-primary").click();
    cy.get("div#address button")
    .should("contain.text", "Leaman Place 569, Brooklyn");
  });
  it("Shows the expected total shipping value", () => {
    cy.get("#total-delivery-cost")
    .should("contain.text", "$50");
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
  });
  it("Post", () => {
    cy.get(".btn.btn-primary").click();
  });
  it("Show success message", () => {
    cy.wait(3000) // wait for 5 seconds
    cy.get("div#success_msg").should("be.visible");
  });
});
