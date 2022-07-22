/// <reference path="../support/index.d.ts" />

describe('Post Page', () => {
  it('should go back to home page', () => {
    cy.visit('/')

    cy.findAllByRole('article').contains('lorem').click()
    cy.url().should('include', '@')

    cy.findByText(/fundador test/i).should('exist')
    cy.findByAltText(/logo nuancias/i).click()

    cy.url().should('eq', 'http://localhost:3000/')
  })
})
