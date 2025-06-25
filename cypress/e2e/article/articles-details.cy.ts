let articleDetailId = "";

describe("Article Details", () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.createArticle().then((data) => {
        articleDetailId = data.id;
        cy.visit("articles/" + articleDetailId);
      });
    });
  });

  afterEach(() => {
    cy.removeArticle(articleDetailId);
  });
  it("passes", () => {
    cy.getByTestId("ArticleDetails.Info").should("exist");
  });
  it("recommendation list", () => {
    cy.getByTestId("ArticleRecommendationsList").should("exist");
  });

  it("send comment", () => {
    cy.getByTestId("ArticleDetails.Info");
    cy.getByTestId("AddCommentForm").scrollIntoView();
    cy.addComment("text");
    cy.getByTestId("CommentCard.Content").should("have.length", 1);
  });

  it("rate", () => {
    cy.getByTestId("ArticleDetails.Info");
    cy.getByTestId("RatingCard").scrollIntoView();
    cy.setRate(4, "feedback");
    cy.get("[data-selected=true]").should("have.length", 4);
  });

  it("rate (fixture)", () => {
    cy.intercept("GET", "**/articles/*", { fixture: "article-details.json" });
    cy.getByTestId("ArticleDetails.Info");
    cy.getByTestId("RatingCard").scrollIntoView();
    cy.setRate(4, "feedback");
    cy.get("[data-selected=true]").should("have.length", 4);
  });
});
