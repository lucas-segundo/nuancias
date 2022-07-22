import Image from 'next/image'
import Link from 'next/link'

import { PagesRoutersEnum } from 'presentation/routers/pages'
import {
  SearchPostsField,
  SearchPostsFieldProps,
} from './search-post-field/search-post-field'

export type NavbarProps = SearchPostsFieldProps

export const Navbar = ({ searchPosts }: NavbarProps) => {
  return (
    <nav className="h-16 bg-black sticky top-0 z-50">
      <div className="flex justify-center md:justify-start items-center h-full default-screen-margin">
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
    </nav>
  )
}
