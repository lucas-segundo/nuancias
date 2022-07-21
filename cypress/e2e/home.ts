/// <reference path="../support/index.d.ts" />

describe('Home page', () => {
  it('should render the page', () => {
    cy.visit('/')

    cy.findByRole('button').should('exist')
  })
})
