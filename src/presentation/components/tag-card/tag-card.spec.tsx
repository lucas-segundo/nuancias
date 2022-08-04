import { render, screen } from '@testing-library/react'
import { makeTagPreview } from 'domain/models/tag/preview/mock'

import { TagCard } from './tag-card'

describe('<TagCard />', () => {
  it('should render the heading', () => {
    const fakeTag = makeTagPreview()
    render(<TagCard tag={fakeTag} />)

    expect(screen.getByText(fakeTag.title)).toBeInTheDocument()
  })
})
