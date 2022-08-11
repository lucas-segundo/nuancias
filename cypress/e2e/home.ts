/// <reference path="../support/index.d.ts" />

const makeSut = () => {
  const findSearchInput = () => cy.findByPlaceholderText(/pesquisar/i)

  return {
    findSearchInput,
  }
}

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show loading on search posts', () => {
    const { findSearchInput } = makeSut()

    findSearchInput().type('lorem')
    cy.getByDataCy('searched-article').first().should('have.attr', 'aria-busy')
  })

  it('should search posts', () => {
    const { findSearchInput } = makeSut()
    cy.intercept('/graphql').as('fetchSearchPosts')

    findSearchInput().type('lorem')
    cy.wait('@fetchSearchPosts')

    cy.getByDataCy('link-to-searched-article').should('have.length.above', 1)
  })

  it('should load the articles in last posts', () => {
    cy.getByDataCy('last-post').should('have.length.above', 1)
  })

  it('should go to article page by last posts', () => {
    cy.getByDataCy('last-post').first().click()
    cy.url().should('include', '@')
  })

  it('should load the articles in other articles', () => {
    cy.getByDataCy('other-posts-section')
      .get('article')
      .should('have.length.above', 1)
  })

  it('should go to article page by other articles', () => {
    cy.getByDataCy('other-posts-section').get('article').first().click()
    cy.url().should('include', '@')
  })

  it('should privacy policy modal be hidden after clicking ok', () => {
    cy.findByLabelText(/Botão Privacidade/i).click()
    cy.findByLabelText(/Política de Privacidade/i).should(
      'have.attr',
      'aria-hidden'
    )
  })
})
