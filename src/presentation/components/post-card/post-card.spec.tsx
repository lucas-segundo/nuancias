import { render, screen } from '@testing-library/react'
import { makePostCardsMock } from 'domain/models/post/mock'
import { makePostLink } from 'presentation/routers/helpers'
import { makePtBRDate } from './helpers'
import PostCard from './post-card'

const makeSut = (postCards = makePostCardsMock()[0]) => {
  render(<PostCard post={postCards} />)
}

describe('<PostCard />', () => {
  it('should load post content to component', async () => {
    const post = makePostCardsMock()[0]
    makeSut(post)

    expect(screen.getByText(post.writer.name)).toBeInTheDocument()
    expect(screen.getByText(post.title)).toBeInTheDocument()
    expect(screen.getByText(post.preview)).toBeInTheDocument()

    const dateFormated = makePtBRDate(post.publishedAt)
    expect(screen.getByText(dateFormated)).toBeInTheDocument()

    const linksToPost = screen.getAllByRole('link-to-post')
    linksToPost.forEach((link) => {
      expect(link).toHaveAttribute(
        'href',
        makePostLink(post.writer.username, post.slug)
      )
    })
  })
})
