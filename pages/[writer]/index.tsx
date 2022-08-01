import { UnexpectedError } from 'domain/errors'
import { WriterDetailsModel } from 'domain/models'
import { makeLoadWriterPage, makeSeachPost } from 'main/factories/use-cases'
import { LoadingPage } from 'presentation/components'

import { GetStaticPaths, GetStaticProps } from 'next'
import { WriterPosts } from 'presentation/templates'
import { useRouter } from 'next/router'
import { makeLoadPostsPath } from 'main/factories/use-cases/load-posts-path/load-posts-path-factory'

const WriterPage = (writer: WriterDetailsModel.Model) => {
  const router = useRouter()

  if (router.isFallback) return <LoadingPage />

  return <WriterPosts writer={writer} searchPosts={makeSeachPost()} />
}

export default WriterPage

type Params = {
  writer: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const loadPagePaths = makeLoadPostsPath()
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

export const getStaticProps: GetStaticProps<WriterDetailsModel.Model> = async ({
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
