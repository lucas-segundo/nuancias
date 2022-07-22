import { Navbar } from 'presentation/components'
import { NavbarProps } from 'presentation/components'

export type BaseProps = {
  children: React.ReactNode
} & NavbarProps

export const Base = (props: BaseProps) => {
  return (
    <>
      <Navbar searchPosts={props.searchPosts} />
      {props.children}
    </>
  )
}
