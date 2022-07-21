import { faker } from '@faker-js/faker'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Authentication } from 'domain/use-cases'
import { Validation } from 'presentation/protocols'

export const makeMockForSignInFormProps = () => {
  const validationMocked: jest.Mocked<Validation> = {
    validate: jest.fn(),
  }

  const authenticationMocked: jest.Mocked<Authentication> = {
    auth: jest.fn(),
  }

  return {
    validationMocked,
    authenticationMocked,
  }
}

export const fillSignInForm = async (
  fakeEmail = faker.internet.email(),
  fakePassword = faker.internet.password()
) => {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/email/i), fakeEmail)
  await user.type(screen.getByLabelText(/senha/i), fakePassword)
  await user.click(screen.getByRole('button', { name: /entrar/i }))
}
