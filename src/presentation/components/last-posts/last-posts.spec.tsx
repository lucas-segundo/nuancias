import { render, screen } from '@testing-library/react'
import { makePostCardsMock } from 'domain/models/post/mock'
import { LastPosts } from './last-posts'

const makeSut = (postCards = makePostCardsMock()) => {
  render(<LastPosts posts={postCards} />)
}

describe('<LastPosts />', () => {
  it('should render the posts cards', async () => {
    makeSut()

    const posts = await screen.findAllByRole('article')

    expect(posts.length).toBeGreaterThan(1)
  })

  it('should render without posts', async () => {
    render(<LastPosts />)

    const empty = screen.getByText(/nenhuma história/i)

    expect(empty).toBeInTheDocument()
  })
})
