/// <reference path="../support/index.d.ts" />

describe('About Page', () => {
  it('should go to page', () => {
    cy.visit('/')
    cy.findByText('Sobre').click()
    cy.findByAltText('Imagem do Fundador').should('exist')
  })
})
