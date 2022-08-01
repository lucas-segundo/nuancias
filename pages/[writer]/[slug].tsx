import { UnexpectedError } from 'domain/errors'
import { makeSeachPost } from 'main/factories/use-cases'
import { makeLoadPostsPath } from 'main/factories/use-cases/load-posts-path/load-posts-path-factory'
import { makeLoadPostPage } from 'main/factories/use-cases/load-post-page/load-post-page-factory'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { LoadingPage } from 'presentation/components'
import { Post } from 'presentation/templates'
import { PostProps } from 'presentation/templates/post/post'

type PostPageProps = Pick<PostProps, 'postData' | 'writer'>

const PostPage = (props: PostPageProps) => {
  const router = useRouter()

  if (router.isFallback) return <LoadingPage />

  return <Post searchPosts={makeSeachPost()} {...props} />
}

export default PostPage

type Params = {
  slug: string
  writer: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const loadPagePaths = makeLoadPostsPath()
  const authToken = process.env.API_JWT_TOKEN || ''

  loadPagePaths.setAuthToken(authToken)
  const data = await loadPagePaths.getAll({ limit: 5 })

  const paths = data.map((data) => ({
    params: {
      slug: data.post.slug,
      writer: '@' + data.writer.username,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const loadPostPage = makeLoadPostPage()
  const authToken = process.env.API_JWT_TOKEN || ''

  loadPostPage.setAuthToken(authToken)
  const data = await loadPostPage.getBySlug(params?.slug as string)

  if (!data) {
    throw new UnexpectedError()
  }

  return {
    props: {
      postData: data,
      writer: data.writer,
    },
    revalidate: Number(process.env.STATIC_PAGE_REVALIDATE_IN_SECONDS),
  }
}
