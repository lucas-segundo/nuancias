import Image from 'next/image'
import { SignInForm } from 'presentation/components'
import { SignInFormProps } from 'presentation/components/sign-in-form/sign-in-form'

export type SignInProps = SignInFormProps

export const SignIn = (props: SignInProps) => {
  return (
    <section className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="md:w-96 mx-5">
        <figure className="bg-black w-14 h-14 mx-auto flex justify-center items-center rounded-full">
          <Image
            src={'/images/logo-black.png'}
            width={25}
            height={40}
            alt="Logo Nuancias"
          />
        </figure>
        <SignInForm {...props} />
        <div className="text-sm text-right mt-4 ">
          <a className="underline text-fuchsia-400">Esqueci a senha</a>
        </div>
        <span className="flex text-sm items-center mt-28 px-5 py-10 border rounded border-fuchsia-400">
          Olá! Nesse momento, cadastros de novas contas são feitas através de
          convites.
        </span>
      </div>
    </section>
  )
}
