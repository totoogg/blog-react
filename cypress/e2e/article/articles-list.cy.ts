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

  it("passes (fixture)", () => {
    cy.intercept("GET", "**/articles?*", ({ fixture: "articles.json" }));
    cy.getByTestId("ArticleList").should("exist");
    cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
  });

  it.skip("passes", () => {
    cy.getByTestId("ArticleList").should("exist");
    cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
    cy.getByTestId("asdas").should("exist");
  });
});
