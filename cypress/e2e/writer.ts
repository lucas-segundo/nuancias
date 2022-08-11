/// <reference path="../support/index.d.ts" />

describe('Writer Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.getByDataCy('last-post')
      .first()
      .findByLabelText(/link para o escritor/i)
      .click()
    cy.getByDataCy('last-post').should('have.length.above', 1)
  })

  it('should go to post', () => {
    cy.getByDataCy('last-post').first().click()
  })

  it('should load itself', () => {
    cy.findByAltText(/escritor principal/).click()
  })
})
