describe("The nav bar", () => {
  it("Should show", () => {
    cy.visit("http://localhost:3000/");
    cy.get("div#nav-bar").should("be.visible");
  });
  it("Should contain both buttons", () => {
    cy.get("a#link-cart").should("be.visible");
    cy.get("a#link-orders").should("be.visible");
  });
  it("Should navigate to cart", () => {
    cy.get("a#link-cart").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/cart')
    });
  });
  it("Should navigate to orders", () => {
    cy.get("a#link-orders").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    });
  });
});