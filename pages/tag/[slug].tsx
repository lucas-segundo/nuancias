import { makeSeachPost } from 'main/factories/use-cases'
import {
  makeLoadTagDetails,
  makeLoadTagPreview,
} from 'main/factories/use-cases'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { LoadingPage } from 'presentation/components'
import { TagPosts, TagPostsProps } from 'presentation/templates'

type TagPageProps = Pick<TagPostsProps, 'tag'>

const TagPage = (props: TagPageProps) => {
  const router = useRouter()

  if (router.isFallback) return <LoadingPage />

  return <TagPosts searchPosts={makeSeachPost()} {...props} />
}

export default TagPage

type Params = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const loadPagePaths = makeLoadTagPreview()
  const authToken = process.env.API_JWT_TOKEN || ''

  loadPagePaths.setAuthToken(authToken)
  const data = await loadPagePaths.getAll({ tagsLimit: 5 })

  const paths = data.map((data) => ({
    params: {
      slug: data.slug,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<TagPageProps> = async ({
  params,
}) => {
  const loadTag = makeLoadTagDetails()
  const authToken = process.env.API_JWT_TOKEN || ''

  loadTag.setAuthToken(authToken)
  const data = await loadTag.get({ slug: params?.slug as string })

  return {
    props: {
      tag: data,
    },
    revalidate: Number(process.env.STATIC_PAGE_REVALIDATE_IN_SECONDS),
  }
}
