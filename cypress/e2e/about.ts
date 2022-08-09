/// <reference path="../support/index.d.ts" />

describe('About Page', () => {
  it('should go to page', () => {
    cy.visit('/')
    cy.findByText('Sobre').click()
    cy.findByText(/sobre o nuancias/i).should('exist')
  })
})
