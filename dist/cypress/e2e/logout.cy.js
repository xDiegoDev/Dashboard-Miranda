"use strict";
describe("Test logout", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.url().should("eq", "http://localhost:3000/login");
        cy.get('[data-cy="email"]').type("diegoprietoiniguez@gmail.com");
        cy.get('[data-cy="password"]').type("123");
        cy.get('[data-cy="submit"]').click();
        cy.url().should("eq", "http://localhost:3000/");
    });
    it("Check logout successful", () => {
        cy.get('[data-cy="logout"]').click();
        cy.url().should("eq", "http://localhost:3000/login");
    });
});
