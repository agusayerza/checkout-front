describe("The checkout page", () => {
  it("Succesfully loads", () => {
    cy.visit("http://localhost:3000/");
  });
  it("Rejects invalid input on credit card data", () => {
    
    const stub = cy.stub()  
    cy.on ('window:alert', stub);

    cy.visit("http://localhost:3000/");
    cy.get(".btn.btn-primary").click();
    cy.get(".btn.btn-primary").click();
    cy.get("select#installments").should("not.have.descendants");
    cy.get("input#cardNumber")
      .type("3711 8030 3257 522")
      .should("have.value", "3711 8030 3257 522");
    cy.wait(500);
    cy.get("input#cardholderName")
      .type("#invalid")
      .should("have.value", "#invalid");
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
    cy.get(".btn.btn-primary").click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Invalid form data')      
    })  
  });
});