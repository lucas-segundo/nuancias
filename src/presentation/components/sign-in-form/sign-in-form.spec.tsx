import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SignInForm } from './sign-in-form'
import { faker } from '@faker-js/faker'
import { fillSignInForm, makeMockForSignInFormProps } from './mocks'
import { useRouter } from 'next/router'
import { PagesRoutersEnum } from 'presentation/routers/pages'

jest.mock('next/router')
const useRouterMocked = useRouter as jest.Mock

const { authenticationMocked, validationMocked } = makeMockForSignInFormProps()
const makeSut = () => {
  validationMocked.validate.mockReturnValue([])

  const routerMocked = {
    push: jest.fn(),
  }
  useRouterMocked.mockReturnValue(routerMocked)

  render(
    <SignInForm
      validation={validationMocked}
      authentication={authenticationMocked}
    />
  )

  return {
    routerMocked,
  }
}

describe('<SignInForm />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with initial state', () => {
    makeSut()

    const errors = screen.queryAllByRole('error')
    expect(errors.length).toBe(0)
  })

  it('should call validation with corrects values', async () => {
    makeSut()
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()
    await fillSignInForm(fakeEmail, fakePassword)

    expect(validationMocked.validate).nthCalledWith(1, 'Email', fakeEmail)
    expect(validationMocked.validate).nthCalledWith(2, 'Senha', fakePassword)
  })

  it('should show validation errors for input fields', async () => {
    makeSut()

    const fakeErrors = [faker.random.words(), faker.random.words()]
    validationMocked.validate.mockReturnValue(fakeErrors)

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    const errors = screen.getAllByRole('error')

    expect(errors.length).toBe(2)
    expect(errors[0]).toHaveTextContent(fakeErrors.join(' '))
  })

  it('should not call authenticate if it has validation errors', async () => {
    makeSut()
    validationMocked.validate.mockReturnValue([
      faker.random.words(),
      faker.random.words(),
    ])

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(authenticationMocked.auth).not.toBeCalled()
  })

  it('should authenticate user with right values', async () => {
    makeSut()
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()

    await fillSignInForm(fakeEmail, fakePassword)

    expect(authenticationMocked.auth).toBeCalledWith({
      email: fakeEmail,
      password: fakePassword,
    })
  })

  it('should redirect to main page after authentication', async () => {
    const { routerMocked } = makeSut()

    await fillSignInForm()
    expect(routerMocked.push).toBeCalledWith(PagesRoutersEnum.HOME)
  })

  it('should handle error if authentication fails', async () => {
    makeSut()

    const fakeErrorMessage = faker.random.words()
    authenticationMocked.auth.mockRejectedValue(new Error(fakeErrorMessage))
    await fillSignInForm()

    expect(screen.getByText(fakeErrorMessage)).toBeInTheDocument()
  })
})
