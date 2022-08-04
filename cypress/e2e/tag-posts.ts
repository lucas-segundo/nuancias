/// <reference path="../support/index.d.ts" />

describe('Writer Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the tag articles from home', () => {
    cy.getByDataCy('last-post')
      .first()
      .findAllByRole('link-to-tag')
      .first()
      .click()
    cy.findAllByRole('article').should('exist')
  })

  it('should load the tag articles from post content', () => {
    cy.getByDataCy('last-post').first().click()
    cy.get('#article-content').should('exist')
    cy.findAllByRole('link-to-tag').first().click()
    cy.findAllByRole('article').should('exist')
  })
})
