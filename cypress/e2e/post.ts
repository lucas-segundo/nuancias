/// <reference path="../support/index.d.ts" />

describe('Post Page', () => {
  it('should render post page', () => {
    cy.visit('/')

    cy.getByDataCy('last-post').first().click()

    cy.findByAltText(/usuário/i).should('exist')
    cy.findByAltText(/história/i).should('exist')
    cy.get('#article-content').should('exist')
  })
})
