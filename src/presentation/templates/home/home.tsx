import {
  Hero,
  LastPosts,
  LastPostsProps,
  NavbarProps,
} from 'presentation/components'
import { Meta } from 'presentation/components/elements'
import { Base } from 'presentation/layouts'

export type HomeProps = NavbarProps & LastPostsProps

const Home = (props: HomeProps) => {
  return (
    <>
      <Meta
        title="Nuancias - Histórias das Intensidades do Mundo."
        description="Nuancias é uma plataforma de publicação sobre histórias, com cada uma com a intenção de mostrar a tonalidade de diferentes conhecimentos e aprendizados."
      />
      <Base searchPosts={props.searchPosts}>
        <Hero />
        <LastPosts posts={props.posts} />
      </Base>
    </>
  )
}

export default Home
