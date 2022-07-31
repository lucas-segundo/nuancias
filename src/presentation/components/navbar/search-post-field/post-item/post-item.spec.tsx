import { faker } from '@faker-js/faker'
import { render, screen } from '@testing-library/react'
import { makeSearchedPostMock } from 'domain/models/post/searched-post/mock'
import { PostItem } from './post-item'

describe('<PostItem />', () => {
  it('should render correctly', () => {
    const post = makeSearchedPostMock(faker.random.word())
    render(<PostItem post={post} />)

    expect(screen.getByText(post.title)).toBeInTheDocument()
  })

  it('should render with loading', () => {
    render(<PostItem isLoading />)

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
  })
})
