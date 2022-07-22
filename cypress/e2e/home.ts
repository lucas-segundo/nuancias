/// <reference path="../support/index.d.ts" />

describe('Home page', () => {
  it('should search posts and remove after erase the search input', () => {
    cy.visit('/')

    const findSearchInput = () => cy.findByPlaceholderText(/pesquisar/i)
    const getSeachedPosts = () => cy.getByDataCy('searched-article')

    findSearchInput().type('lorem')
    getSeachedPosts().should('have.length.above', 1)

    findSearchInput().clear().type('lo').clear()
    getSeachedPosts().should('not.exist')
  })
})
