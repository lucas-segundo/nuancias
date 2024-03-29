import {
  makeSeachPost,
  makeLoadPostPreview,
  makeLoadTagPreview,
} from 'main/factories/use-cases'
import type { GetStaticProps, NextPage } from 'next'
import { Home } from 'presentation/templates'
import { HomeProps } from 'presentation/templates/home/home'

const HomePage: NextPage = (props) => {
  return <Home searchPosts={makeSeachPost()} {...props} />
}

export default HomePage

export const getStaticProps: GetStaticProps<
  Pick<HomeProps, 'posts'>
> = async () => {
  const loadPostCards = makeLoadPostPreview()
  const authToken = process.env.API_JWT_TOKEN || ''
  loadPostCards.setAuthToken(authToken)

  const posts = await loadPostCards.getAll({
    limit: 12,
    sort: {
      by: 'publishedAt',
      order: 'desc',
    },
  })

  const loadTags = makeLoadTagPreview()

  loadTags.setAuthToken(authToken)
  const data = await loadTags.getAll({ tagsLimit: 5 })

  return {
    props: {
      posts,
      tags: data,
    },
    revalidate: Number(process.env.STATIC_PAGE_REVALIDATE_IN_SECONDS),
  }
}
