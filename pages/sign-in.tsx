import { makeAuthentication } from 'main/factories/use-cases/authentication/authentication-factory'
import { makeSignInValidation } from 'main/factories/use-cases/validation'
import type { NextPage } from 'next'
import { SignIn } from 'presentation/templates'

const SignInPage: NextPage = () => {
  return (
    <SignIn
      authentication={makeAuthentication()}
      validation={makeSignInValidation()}
    />
  )
}

export default SignInPage
