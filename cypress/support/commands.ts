/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { login } from "./commands/login";

Cypress.Commands.add("login", login);

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
    }
  }
}

export {};
