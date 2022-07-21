import { Authentication } from 'domain/use-cases'
import { useRouter } from 'next/router'
import { Validation } from 'presentation/protocols'
import { PagesRoutersEnum } from 'presentation/routers/pages'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, InputField } from '../elements'

export type SignInFormProps = {
  validation: Validation
  authentication: Authentication
}

const SignInForm = ({ validation, authentication }: SignInFormProps) => {
  const router = useRouter()
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleSetValues = (event: ChangeEvent<HTMLInputElement>) => {
    const { type, value } = event.target
    setValues((prev) => ({ ...prev, [type]: value }))
  }

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const [authErrorMessage, setAuthErrorMessage] = useState('')

  const makeErrorMessage = (text: string) => (
    <span role="error" className="text-sm text-red-500 font-semibold">
      {text}
    </span>
  )

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const emailErrors = validation.validate('Email', values.email)
    const passwordErrors = validation.validate('Senha', values.password)

    setErrors({
      email: emailErrors.join(' '),
      password: passwordErrors.join(' '),
    })

    if (!emailErrors.length && !passwordErrors.length) {
      try {
        await authentication.auth(values)
        router.push(PagesRoutersEnum.HOME)
      } catch (error) {
        if (error instanceof Error) setAuthErrorMessage(error.message)
      }
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="space-y-2">
        <InputField
          label="Email"
          type="email"
          value={values.email}
          onChange={(event) => handleSetValues(event)}
        />
        {errors.email && makeErrorMessage(errors.email)}
        <InputField
          label="Senha"
          type="password"
          value={values.password}
          onChange={(event) => handleSetValues(event)}
        />
        {errors.password && makeErrorMessage(errors.password)}
      </div>
      <div className="mt-7 mb-2 space-x-10">
        <Button text="Entrar" />
      </div>
      {authErrorMessage && makeErrorMessage(authErrorMessage)}
    </form>
  )
}

export default SignInForm
