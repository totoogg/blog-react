describe("Articles List", () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit("articles");
    });
  });
  it("passes", () => {
    cy.getByTestId("ArticleList").should("exist");
    cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
  });
});
