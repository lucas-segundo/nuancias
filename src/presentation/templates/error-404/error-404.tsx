import Link from 'next/link'
import { Button } from 'presentation/components/elements'
import { NavbarProps } from 'presentation/components'
import { Base } from 'presentation/layouts'
import { PagesRoutersEnum } from 'presentation/routers/pages'

export type Error404Props = NavbarProps

export const Error404 = (props: Error404Props) => {
  return (
    <Base searchPosts={props.searchPosts}>
      <section className="w-full mt-40 max-w-3xl mx-auto flex flex-col justify-center border rounded shadow">
        <div className="text-center p-4">
          <h1 className="text-6xl font-bold text-yellow-400">404</h1>
          <h2 className="text-3xl font-bold text-gray-800">
            Aonde você está indo?
          </h2>
          <p className="text-gray-600 my-4">
            Não encontramos o que deseja. Por favor, verifique se o link está
            correto.
          </p>
          <Link href={PagesRoutersEnum.HOME} passHref>
            <Button text="OK" />
          </Link>
        </div>
      </section>
    </Base>
  )
}
