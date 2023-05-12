describe("Test login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("Check login successful", () => {
    cy.get('[data-cy="email"]').type("diegoprietoiniguez@gmail.com");
    cy.get('[data-cy="password"]').type("123");
    cy.get('[data-cy="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("Check login not successful", () => {
    cy.get('[data-cy="email"]').type("a@a.me");
    cy.get('[data-cy="password"]').type("a");
    cy.get('[data-cy="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/login");
  });
});
