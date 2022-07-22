// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands'

Cypress.Commands.add('google', () => cy.visit('https://www.google.com'))

Cypress.Commands.add(
  'signIn',
  (email = 'teste@gmail.com', password = 'teste123') => {
    cy.visit('/')

    cy.findByLabelText(/botão de logar/i).click()
    cy.findByLabelText(/email/i).type(email)
    cy.findByLabelText(/senha/i).type(password)

    cy.findByText(/entrar/i).click()
  }
)

Cypress.Commands.add('getByDataCy', (selector, ...args) => {
  cy.get(`[data-cy="${selector}"]`, ...args)
})
