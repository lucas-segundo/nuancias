import { makeSeachPost } from 'main/factories/use-cases'
import { AboutUs } from 'presentation/templates'

export default function AboutPage() {
  return <AboutUs searchPosts={makeSeachPost()} />
}
