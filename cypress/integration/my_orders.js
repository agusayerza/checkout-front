describe("The order pages", () => {
  it("Should show one order", () => {
    cy.visit("http://localhost:3000/");
    cy.get("div.checkout-card").should("be.visible");
  });
});