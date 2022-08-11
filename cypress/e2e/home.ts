/// <reference path="../support/index.d.ts" />

const makeSut = () => {
  const findSearchInput = () => cy.findByPlaceholderText(/pesquisar/i)
  const expectPostPage = () => cy.getByDataCy('post-page').should('exist')
  const expectWriterPage = () => cy.getByDataCy('writer-page').should('exist')
  const expectTagPage = () => cy.getByDataCy('tag-page').should('exist')

  return {
    findSearchInput,
    expectPostPage,
    expectWriterPage,
    expectTagPage,
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

  it('should go to article page from last posts section', () => {
    const { expectPostPage } = makeSut()

    cy.getByDataCy('last-post').first().click()
    expectPostPage()
  })

  it('should go to writer page from last posts section', () => {
    const { expectWriterPage } = makeSut()

    cy.getByDataCy('last-post').getByDataCy('link-to-writer').first().click()
    expectWriterPage()
  })

  it('should go to tag page from last posts section', () => {
    const { expectTagPage } = makeSut()

    cy.getByDataCy('last-post').getByDataCy('link-to-tag').first().click()
    expectTagPage()
  })

  it('should go to article page from other articles', () => {
    const { expectPostPage } = makeSut()

    cy.getByDataCy('other-posts-section').get('article').first().click()
    expectPostPage()
  })

  it('should go to writer page from other articles', () => {
    const { expectWriterPage } = makeSut()

    cy.getByDataCy('other-posts-section')
      .getByDataCy('link-to-writer')
      .first()
      .click()
    expectWriterPage()
  })

  it('should go to tag page from other articles', () => {
    const { expectTagPage } = makeSut()

    cy.getByDataCy('other-posts-section')
      .getByDataCy('link-to-tag')
      .first()
      .click()
    expectTagPage()
  })

  it('should privacy policy modal be hidden after clicking ok', () => {
    cy.findByLabelText(/Botão Privacidade/i).click()
    cy.findByLabelText(/Política de Privacidade/i).should(
      'have.attr',
      'aria-hidden'
    )
  })
})
