import { UnexpectedError } from 'domain/errors'
import { WriterPageModel } from 'domain/models'
import { makeLoadWriterPage, makeSeachPost } from 'main/factories/use-cases'
import { LoadingPage } from 'presentation/components'

import { GetStaticPaths, GetStaticProps } from 'next'
import { WriterPosts } from 'presentation/templates'
import { useRouter } from 'next/router'
import { makeLoadPostPaths } from 'main/factories/use-cases/load-post-page-paths/load-post-page-paths-factory'

const WriterPage = (writer: WriterPageModel.Model) => {
  const router = useRouter()

  if (router.isFallback) return <LoadingPage />

  return <WriterPosts writer={writer} searchPosts={makeSeachPost()} />
}

export default WriterPage

type Params = {
  writer: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const loadPagePaths = makeLoadPostPaths()
  const authToken = process.env.API_JWT_TOKEN || ''

  loadPagePaths.setAuthToken(authToken)
  const data = await loadPagePaths.getAll({ limit: 5 })

  const paths = data.map((data) => ({
    params: {
      writer: '@' + data.writer.username,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<WriterPageModel.Model> = async ({
  params,
}) => {
  const loadWriterPage = makeLoadWriterPage()
  const authToken = process.env.API_JWT_TOKEN || ''

  loadWriterPage.setAuthToken(authToken)
  const username = params?.writer as string

  if (!username) {
    throw new UnexpectedError()
  }

  const writer = await loadWriterPage.get({
    username: username.replace('@', ''),
    postsLimit: 6,
  })

  if (!writer) {
    throw new UnexpectedError()
  }

  return {
    props: writer,
    revalidate: Number(process.env.STATIC_PAGE_REVALIDATE_IN_SECONDS),
  }
}