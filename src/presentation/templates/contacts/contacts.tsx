import { NavbarProps } from 'presentation/components'
import { Meta } from 'presentation/components/elements'
import { Base } from 'presentation/layouts'
import { PagesRoutersEnum } from 'presentation/routers/pages'
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineMail,
} from 'react-icons/ai'

export type ContactsProps = NavbarProps

export const Contacts = (props: ContactsProps) => {
  return (
    <>
      <Meta
        title="Nuancias - Contatos"
        description="Veja as melhores formas de falar conosco."
        openGraph={{
          url: '/' + PagesRoutersEnum.CONTACTS,
          locale: 'pt-BR',
          site_name: 'Nuancias',
          images: [
            {
              url: '/images/meta-tag-image-logo.jpg',
              width: 1200,
              height: 630,
              alt: 'Logo Nuancias',
            },
          ],
        }}
      />
      <Base searchPosts={props.searchPosts}>
        <div className="default-screen-margin border mt-10 rounded p-6">
          <h1 className="text-4xl font-bold">Contatos</h1>
          <p className="my-2 text-lg">
            Escolha a melhor forma de falar conosco:{' '}
          </p>
          <ul className="text-lg">
            <li className="flex items-center">
              <AiOutlineMail />
              <a
                className="underline ml-1"
                href="mailto: lucas.fernandes.app@gmail.com"
              >
                Email: lucas.fernandes.app@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <AiFillLinkedin />
              <a
                className="underline ml-1"
                href="https://www.linkedin.com/in/engplucasfernandes/"
              >
                Linkedin: engplucasfernandes
              </a>
            </li>
            <li className="flex items-center">
              <AiOutlineInstagram />
              <a
                className="underline"
                href="https://www.instagram.com/lucassegundof/"
              >
                Instagram: lucassegundof
              </a>
            </li>
          </ul>
        </div>
      </Base>
    </>
  )
}
