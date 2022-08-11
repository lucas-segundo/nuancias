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
import { LogoJsonLd } from 'next-seo'

export type HomeProps = NavbarProps & LastPostsProps & GroupedTagsProps

export const Home = (props: HomeProps) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  return (
    <>
      <Meta
        title="Nuancias - Histórias das Intensidades do Mundo."
        description="Nuancias é uma plataforma de publicação sobre histórias, com cada uma com a intenção de mostrar a tonalidade de diferentes conhecimentos e aprendizados."
        openGraph={{
          url: siteUrl + '/',
          locale: 'pt-BR',
          site_name: 'Nuancias',
          images: [
            {
              url: siteUrl + '/images/meta-tag-image-logo.jpg',
              width: 1200,
              height: 630,
              alt: 'Logo Nuancias',
            },
          ],
        }}
      />
      <LogoJsonLd
        url={siteUrl as string}
        logo={siteUrl + '/images/meta-tag-image-logo.jpg'}
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
