import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { IoMdClose } from 'react-icons/io'

type ListItemProps = {
  title: string
}

const ListItem = (props: ListItemProps) => (
  <li>
    <span>{props.title}</span>
    <div className="md:hidden">
      <span className="bg-cyan-400 w-10 lg:w-20 h-0.5 block"></span>
    </div>
  </li>
)

export type NavItemsProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const NavItems = (props: NavItemsProps) => {
  return (
    <div
      role="navbar-items"
      hidden={!props.isOpen}
      className="bg-black px-6 w-2/4 h-screen md:h-auto fixed md:static md:block top-0 left-0"
    >
      <div className="flex justify-end my-2 md:hidden">
        <IoMdClose
          aria-label="Fechar barra de navegação"
          onClick={() => props.setIsOpen(false)}
          size={22}
          className="text-gray-100"
        />
      </div>
      <figure className="md:hidden">
        <Image
          src="/images/logo-nuancias.jpg"
          width={150}
          height={50}
          alt="Logo Nuancias"
          quality={100}
        />
      </figure>
      <ul className="text-gray-100 font-bold mt-2 space-y-2 md:space-y-0 md:flex md:justify-end md:space-x-16">
        <ListItem title="Home" />
        <ListItem title="Sobre" />
        <ListItem title="Contato" />
      </ul>
    </div>
  )
}
