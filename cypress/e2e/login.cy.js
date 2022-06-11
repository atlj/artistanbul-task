describe("Login screen", () => {
  beforeEach(() => {
    cy.visit("localhost:3001");
  });
  it("should show the login form", () => {
    expect(cy.get("#login-form").should("be.visible"));
  });

  it("should not let the user login without typing username", () => {
    cy.get('#login-form button[type="submit"]').click();
    cy.get("#login-form").should("be.visible");
  });

  it("should not let the user login with space as username", () => {
    cy.get('#login-form input[name="username"]').type(" ");
    cy.get('#login-form button[type="submit"]').click();
    cy.get("#login-form").should("be.visible");
  });

  it("should login with a username typed", () => {
    cy.get('#login-form input[name="username"]').type("test");
    cy.get('#login-form button[type="submit"]').click();
    cy.get("#login-form").should("not.be.visible");
  });
});
