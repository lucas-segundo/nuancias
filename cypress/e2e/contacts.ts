/// <reference path="../support/index.d.ts" />

describe('Contacts Page', () => {
  it('should go to page', () => {
    cy.visit('/')
    cy.findByText('Contato').click()
    cy.findByText(/falar conosco/i).should('exist')
  })
})
