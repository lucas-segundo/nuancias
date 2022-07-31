import { render, screen } from '@testing-library/react'
import { makeWriterCardMock } from 'domain/models/writer/writer-card/mock'
import { makeWriterLink } from 'presentation/routers/helpers'

import { WriterCard } from './writer-card'

const makeSut = (userData = makeWriterCardMock()) => {
  render(<WriterCard writer={userData} />)
}

describe('<WriterCard />', () => {
  it('should render with props', () => {
    const userData = makeWriterCardMock()
    makeSut(userData)

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      makeWriterLink(userData.username)
    )
    expect(screen.getByAltText(/usuário principal/i)).toBeInTheDocument()
    expect(screen.getByText(userData.name)).toBeInTheDocument()
    expect(screen.getByText(userData.bio)).toBeInTheDocument()
  })
})
