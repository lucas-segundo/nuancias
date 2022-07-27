import {
  NavbarProps,
  Footer,
  Navbar,
  PrivacyPolicy,
} from 'presentation/components'

export type BaseProps = {
  children: React.ReactNode
} & NavbarProps

export const Base = (props: BaseProps) => {
  return (
    <>
      <Navbar searchPosts={props.searchPosts} />
      {props.children}
      <PrivacyPolicy />
      <Footer />
    </>
  )
}
