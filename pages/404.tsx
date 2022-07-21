import { makeSeachPost } from 'main/factories/use-cases'
import { Error404 } from 'presentation/templates'

export default function Custom404Page() {
  return <Error404 searchPosts={makeSeachPost()} />
}
