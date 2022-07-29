import { render, screen } from '@testing-library/react'
import { makeWriterCardMock } from 'domain/models/writer/writer-card/mock'
//import { makeUserLink } from 'presentation/routers/helpers'

import { UserCard } from './user-card'

const makeSut = (userData = makeWriterCardMock()) => {
  render(<UserCard userData={userData} />)
}

describe('<UserCard />', () => {
  it('should render with props', () => {
    const userData = makeWriterCardMock()
    makeSut(userData)

    // expect(screen.getByRole('link')).toHaveAttribute(
    //   'href',
    //   makeUserLink(userData.username)
    // )
    expect(screen.getByAltText(/usuário principal/i)).toBeInTheDocument()
    expect(screen.getByText(userData.name)).toBeInTheDocument()
    expect(screen.getByText(userData.bio)).toBeInTheDocument()
  })
})
