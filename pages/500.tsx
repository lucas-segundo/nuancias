import { makeSeachPost } from 'main/factories/use-cases'
import { Error500 } from 'presentation/templates'

export default function Custom500Page() {
  return <Error500 searchPosts={makeSeachPost()} />
}
