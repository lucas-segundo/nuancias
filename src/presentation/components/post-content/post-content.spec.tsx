import { render, screen } from '@testing-library/react'
import { makePostPageMock } from 'domain/models/post/mock'
import { makePtBRDate } from '../post-card/helpers'

import { PostContent } from './post-content'

const makeSut = (postData = makePostPageMock()) => {
  render(<PostContent postData={postData} />)
}

describe('<PostContent />', () => {
  it('should render with props', () => {
    const postData = makePostPageMock()
    makeSut(postData)

    expect(screen.getByText(postData.title)).toBeInTheDocument()
    expect(
      screen.getByText(makePtBRDate(postData.publishedAt))
    ).toBeInTheDocument()
    expect(screen.getAllByRole('tag-item').length).toBeGreaterThan(0)
    expect(screen.getByAltText(/imagem principal/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /hello/i })).toBeInTheDocument()
  })
})
