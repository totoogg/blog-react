import { selectByTestId } from "cypress/helpers/selectByTestId";

describe("Routing", () => {
  describe("not authorized user", () => {
    it("main page", () => {
      cy.visit("/");
      cy.get(selectByTestId("MainPage")).should("exist");
    });

    it("profile page", () => {
      cy.visit("/profile/1");
      cy.get(selectByTestId("MainPage")).should("exist");
    });

    it("not found page", () => {
      cy.visit("/asd");
      cy.get(selectByTestId("NotFoundPage")).should("exist");
    });
  });

  describe("authorized user", () => {
    beforeEach(() => {
      cy.login("admin", "123");
    });

    it("profile page", () => {
      cy.visit("/profile/1");
      cy.get(selectByTestId("ProfilePage")).should("exist");
    });

    it("articles page", () => {
      cy.visit("/articles");
      cy.get(selectByTestId("ArticlesPage")).should("exist");
    });
  });
});
