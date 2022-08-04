import { render, screen } from '@testing-library/react'
import { makeTagPreview } from 'domain/models/tag/preview/mock'

import { GroupedTags } from './grouped-tags'

const makeSut = () => {
  const tags = [
    makeTagPreview(),
    makeTagPreview(),
    makeTagPreview(),
    makeTagPreview(),
    makeTagPreview(),
  ]

  return {
    tags,
  }
}

describe('<GroupedTags />', () => {
  it('should render correctly', () => {
    const { tags } = makeSut()
    render(<GroupedTags tags={tags} />)

    expect(screen.getAllByRole('link-to-tag').length).toBeGreaterThan(0)
  })
})
