import { makeSeachPost } from 'main/factories/use-cases'
import { Contacts } from 'presentation/templates'

export default function ContactsPage() {
  return <Contacts searchPosts={makeSeachPost()} />
}
