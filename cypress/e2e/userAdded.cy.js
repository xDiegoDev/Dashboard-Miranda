describe("Test createdUser", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("Check user created succesfully", () => {
    cy.get('[data-cy="email"]').type("diegoprietoiniguez@gmail.com");
    cy.get('[data-cy="password"]').type("123");
    cy.get('[data-cy="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.get('[data-cy="burger"]').click();
    cy.get('[data-cy="Users"]').click();
    cy.url().should("eq", "http://localhost:3000/users");

    cy.get('[data-cy="addUser"]').click();
    cy.get('[data-cy="name"]').type("diego");
    cy.get('[data-cy="email"]').type("a@a.com");
    cy.get('[data-cy="startDate"]').click().type("2023-04-20");
    cy.get('[data-cy="job"]').type("manager");
    cy.get('[data-cy="status"]')
      .select("Active")
      .should("have.value", "Active");
    cy.get('[data-cy="submit"]').click();

    cy.window()
      .its("store")
      .invoke("getState")
      .its("users")
      .its("userCreated")
      .should("deep.equal", {
        Name: "diego",
        Password: "diego",
        email: "a@a.com",
        phone: "123456789",
        "Start Date": "2023-04-20T00:00",
        Description: "engineer",
        Status: "Active",
      });
  });
});
