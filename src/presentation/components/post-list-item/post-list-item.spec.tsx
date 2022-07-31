import { render, screen } from '@testing-library/react'
import { makePostPreviewMock } from 'domain/models/post/preview/mock'
import { makePtBRDate } from '../post-card/helpers'

import { PostListItem } from './post-list-item'

const makeSut = (fakePost = makePostPreviewMock()) => {
  render(<PostListItem post={fakePost} />)
}

describe('<PostListItem />', () => {
  it('should render with props', () => {
    const fakePost = makePostPreviewMock()
    makeSut(fakePost)

    expect(screen.getByAltText(/Imagem do usuário/i)).toBeInTheDocument()
    expect(screen.getByText(fakePost.writer.name)).toBeInTheDocument()
    expect(screen.getByText(fakePost.title)).toBeInTheDocument()
    expect(
      screen.getByText(makePtBRDate(fakePost.publishedAt))
    ).toBeInTheDocument()
    expect(screen.getByAltText(/Imagem da história/i)).toBeInTheDocument()

    fakePost.tags.forEach((tag) => {
      expect(screen.getByText(tag.title)).toBeInTheDocument()
    })
  })
})
