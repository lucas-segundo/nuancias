import { render, screen } from '@testing-library/react'
import { makePostPreviewMock } from 'domain/models/post/preview/mock'

import { OtherPosts } from './other-posts'

const makeFakePosts = () => [makePostPreviewMock(), makePostPreviewMock()]

const makeSut = (posts = makeFakePosts()) => {
  render(<OtherPosts posts={posts} />)
}

describe('<OtherPosts />', () => {
  it('should render the heading', () => {
    const posts = makeFakePosts()
    makeSut()

    const articles = screen.getAllByRole('article')
    expect(articles.length).toBe(posts.length)
  })
})
