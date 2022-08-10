import { render, screen } from '@testing-library/react'
import { makePostPreviewMock } from 'domain/models/post/preview/mock'
import { makePostLink, makeWriterLink } from 'presentation/routers/helpers'
import { makePtBRDate } from './helpers'
import { PostCard } from './post-card'

const makeSut = (postCards = makePostPreviewMock()) => {
  render(
    <PostCard
      post={postCards}
      tags={postCards.tags}
      postImage={postCards.image}
      writer={postCards.writer}
    />
  )
}

describe('<PostCard />', () => {
  it('should load post content to component', async () => {
    const post = makePostPreviewMock()
    makeSut(post)

    expect(screen.getByText(post.writer.name)).toBeInTheDocument()
    expect(screen.getByText(post.title)).toBeInTheDocument()
    expect(screen.getByText(post.preview)).toBeInTheDocument()

    const dateFormated = makePtBRDate(post.publishedAt)
    expect(screen.getByText(dateFormated)).toBeInTheDocument()

    const linksToPost = screen.getAllByLabelText(/link para história/i)
    linksToPost.forEach((link) => {
      expect(link).toHaveAttribute(
        'href',
        makePostLink(post.writer.username, post.slug)
      )
    })

    const linksToWriter = screen.getAllByLabelText(/link para o escritor/i)
    linksToWriter.forEach((link) => {
      expect(link).toHaveAttribute('href', makeWriterLink(post.writer.username))
    })
  })
})
