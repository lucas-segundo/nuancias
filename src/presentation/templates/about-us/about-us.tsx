import Image from 'next/image'
import { NavbarProps } from 'presentation/components'
import { Meta } from 'presentation/components/elements'
import { Base } from 'presentation/layouts'
import { PagesRoutersEnum } from 'presentation/routers/pages'

export type AboutUsProps = NavbarProps
export const AboutUs = (props: AboutUsProps) => {
  return (
    <>
      <Meta
        title="Nuancias - Sobre"
        description="Fala aí, tudo bem? Me chamo Lucas Segundo, fundador do Nuancias. Estou aqui para falar pessoalmente do que
        se trata esse site."
        openGraph={{
          url: process.env.NEXT_PUBLIC_SITE_URL + '/' + PagesRoutersEnum.ABOUT,
          locale: 'pt-BR',
          site_name: 'Nuancias',
          images: [
            {
              url:
                process.env.NEXT_PUBLIC_SITE_URL +
                '/images/meta-tag-image-logo.jpg',
              width: 1200,
              height: 630,
              alt: 'Logo Nuancias',
            },
          ],
        }}
      />
      <Base searchPosts={props.searchPosts}>
        <article
          id="article-content"
          className="default-screen-margin mt-4 md:mt-10 md:grid md:grid-cols-2"
        >
          <figure className="md:order-last mx-auto">
            <Image
              className="rounded"
              src="/images/founder.jpg"
              width={500}
              height={500}
              alt="Imagem do Fundador"
            />
          </figure>
          <div>
            <h1 className="text-4xl font-bold mt-4">Sobre o Nuancias</h1>
            <p>
              Fala aí, tudo bem? Me chamo{' '}
              <a href="https://www.instagram.com/lucassegundof/">
                Lucas Segundo
              </a>
              , fundador do Nuancias. Estou aqui para falar pessoalmente do que
              se trata esse site.
            </p>
            <p>
              O <strong>Nuancias</strong> é uma{' '}
              <strong>plataforma de publicação</strong> visando trazer histórias
              que possam, de alguma forma, trazer aprendizados e pontos de
              vistas diferentes, assim como acontece quando estamos com os
              amigos, onde cada um tem uma história para compartilhar de algo
              que ocorreu na vida.
            </p>
            <p>
              <strong>É importante</strong> que saiba que cada categoria de
              história (moda, programação, saúde e entre outros) é chamada de{' '}
              <strong>Nuancia</strong>. Ou seja, quer saber das nuancias de
              saúde? Acesse as histórias marcada com esse tipo. Simples assim.
            </p>
            <h2>Mas tá, de onde veio essa palavra que da nome ao site?</h2>
            <p>
              A palavra foi inspirada no termo francês <em>Nuance</em>, que
              significa variações sutis ou diferença de coisas do mesmo gênero.
              Mas como percebeu, a pronúncia é bem diferente, o que eu não notei
              ao começar a falar essa palavra. Isso mesmo! Eu falava nuancias!
              hahah. E na época que comecei a fazer isso, eu pronunciava direto
              para qualquer coisa. Desde problemas até assuntos cotidianos.
            </p>
            <p>
              Como eu que queria criar algo que pudesse falar de vários temas,
              decidi trazer essa palavra inventada.
            </p>
            <p>
              Gostou dessa história? Agradeço a sua atenção e espero lhe ver em
              outras também! Até mais.
            </p>
          </div>
        </article>
      </Base>
    </>
  )
}
