import { render, screen } from '@testing-library/react'
import { makePostContentMock } from 'domain/models/post/content/mock'
import { makePtBRDate } from '../post-card/helpers'

import { PostContent } from './post-content'

const makeSut = (postData = makePostContentMock()) => {
  render(<PostContent postData={postData} />)
}

describe('<PostContent />', () => {
  it('should render with props', () => {
    const postData = makePostContentMock()
    makeSut(postData)

    expect(screen.getByText(postData.title)).toBeInTheDocument()
    expect(
      screen.getByText(makePtBRDate(postData.publishedAt))
    ).toBeInTheDocument()
    expect(
      screen.getAllByLabelText(/item de uma categória/i).length
    ).toBeGreaterThan(0)
    expect(screen.getByAltText(/imagem principal/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /hello/i })).toBeInTheDocument()
  })
})
