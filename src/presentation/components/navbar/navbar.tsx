import Image from 'next/image'
import Link from 'next/link'

import { PagesRoutersEnum } from 'presentation/routers/pages'
import { useState } from 'react'
import { NavItems } from './nav-items/nav-items'
import {
  SearchPostsField,
  SearchPostsFieldProps,
} from './search-post-field/search-post-field'

export type NavbarProps = SearchPostsFieldProps

export const Navbar = ({ searchPosts }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="h-16 bg-black sticky top-0 z-50">
      <div className="flex justify-center md:justify-between items-center h-full default-screen-margin">
        <button
          aria-label="Abrir barra de navegação"
          onClick={() => setIsOpen(true)}
          className="space-y-2 rounded shadow mr-4 md:hidden"
        >
          <span className="block w-6 h-0.5 bg-gray-100"></span>
          <span className="block w-6 h-0.5 bg-gray-100"></span>
          <span className="block w-6 h-0.5 bg-gray-100"></span>
        </button>
        <div className="flex items-center">
          <Link href={PagesRoutersEnum.HOME}>
            <a>
              <Image
                className="cursor-pointer"
                src={`/images/logo-black.jpg`}
                width={30}
                height={47}
                alt="Logo Nuancias"
              />
            </a>
          </Link>
          <SearchPostsField searchPosts={searchPosts} />
        </div>
        <NavItems isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </nav>
  )
}
