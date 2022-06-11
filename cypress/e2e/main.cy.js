function addTodo() {
  cy.get("#add-todo").click();
  cy.get('#new-todo input[name="title"]').type("test");
  cy.get('#new-todo input[name="date"]').type("2020-01-01");
  cy.get('#new-todo button[type="submit"]').click();
}

describe("Main screen", () => {
  beforeEach(() => {
    cy.visit("localhost:3001/?username=test");
  });

  it("should add a todo", () => {
    addTodo();
    cy.get('input[value="test"]').should("be.visible");
  });

  it("should add a todo then remove it", () => {
    addTodo();
    cy.get('input[value="test"]').should("be.visible");
    cy.get("#todo-0 #delete-button").click();
    cy.get("#todo-0 #delete-button").click();
    cy.get('input[value="test"]').should("not.exist");
    cy.get("#todo-day-2020-01-01").should("not.exist");
  });

  it("should add a todo then edit it", () => {
    addTodo();
    cy.get('input[value="test"]').should("be.visible");
    cy.get("#todo-0 #edit-button").click();
    cy.get('input[value="test"]').clear();
    cy.get('input[value="test"]').type("test2");
  });
});
