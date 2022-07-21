import { render, screen } from '@testing-library/react'
import { makeMockForSignInFormProps } from 'presentation/components/sign-in-form/mocks'

import SignIn from './sign-in'

const { authenticationMocked, validationMocked } = makeMockForSignInFormProps()

describe('<SignIn />', () => {
  it('should render the component', () => {
    render(
      <SignIn
        validation={validationMocked}
        authentication={authenticationMocked}
      />
    )

    expect(screen.getByText(/esqueci/i)).toBeInTheDocument()
  })
})
