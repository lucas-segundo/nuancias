/// <reference path="../support/index.d.ts" />

describe('Writer Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.getByDataCy('last-post').first().findByRole('link-to-writer').click()
    cy.getByDataCy('last-post').should('have.length.above', 1)
  })

  it('should go to post', () => {
    cy.getByDataCy('last-post').first().click()
  })

  it.only('should load itself', () => {
    cy.findByAltText(/usuário principal/).click()
  })
})
