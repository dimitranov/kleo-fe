describe("empty spec", () => {
  it("passes", () => {
    cy.visit("localhost:3000");
    cy.get('[data-testid="inc-btn"]').click();
    cy.get('[data-testid="count-value"]').should("have.text", "1");
  });
});
