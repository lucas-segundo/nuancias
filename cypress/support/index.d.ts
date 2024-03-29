// load type definitions from Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to visit google page.
     * @example cy.google()
     */
    google(): Chainable<Window>

    /**
     * Custom command to sign up
     * @example cy.signIn()
     */
    signIn(email?: string, password?: string): Chainable<Element>

    /**
     * Custom command to get element by data-cy
     * @example cy.getByDataCy('selector')
     */
    getByDataCy(selector: string): Chainable<Element>
  }
}
