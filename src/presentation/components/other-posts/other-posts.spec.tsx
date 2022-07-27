import { render, screen } from '@testing-library/react'
import { makePostCardsMock } from 'domain/models/post/mock'

import { OtherPosts } from './other-posts'

const makeSut = (posts = makePostCardsMock()) => {
  render(<OtherPosts posts={posts} />)
}

describe('<OtherPosts />', () => {
  it('should render the heading', () => {
    const posts = makePostCardsMock()
    makeSut()

    const articles = screen.getAllByRole('article')
    expect(articles.length).toBe(posts.length)
  })
})
