import {
  Hero,
  LastPosts,
  LastPostsProps,
  NavbarProps,
} from 'presentation/components'
import { Meta } from 'presentation/components/elements'
import { OtherPosts } from 'presentation/components'
import { Base } from 'presentation/layouts'
import {
  GroupedTags,
  GroupedTagsProps,
} from 'presentation/components/grouped-tags/grouped-tags'

export type HomeProps = NavbarProps & LastPostsProps & GroupedTagsProps

export const Home = (props: HomeProps) => {
  return (
    <>
      <Meta
        title="Nuancias - Histórias das Intensidades do Mundo."
        description="Nuancias é uma plataforma de publicação sobre histórias, com cada uma com a intenção de mostrar a tonalidade de diferentes conhecimentos e aprendizados."
      />
      <Base searchPosts={props.searchPosts}>
        <Hero />
        <LastPosts posts={props.posts?.slice(0, 6)} />
        <section className="grid grid-cols-1 md:grid-cols-2 default-screen-margin mt-7">
          <div className="order-last md:order-first">
            <OtherPosts posts={props.posts?.slice(6)} />
          </div>
          <GroupedTags tags={props.tags} />
        </section>
      </Base>
    </>
  )
}
