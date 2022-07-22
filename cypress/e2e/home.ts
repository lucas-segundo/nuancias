/// <reference path="../support/index.d.ts" />

describe('Home page', () => {
  it('should search posts and remove after erase the search input', () => {
    cy.visit('/')

    const findSearchInput = () => cy.findByPlaceholderText(/pesquisar/i)
    const findFirstSeachedPost = () =>
      cy.get(':nth-child(1) > a > .font-medium')

    findSearchInput().type('lorem')
    findFirstSeachedPost().should('exist')

    findSearchInput().clear()
    findFirstSeachedPost().should('not.exist')
  })
})
