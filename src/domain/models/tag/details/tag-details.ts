export type Image = {
  src: string
}

export type Writer = {
  id: string
  name: string
  bio: string
  username: string
  avatar: Image
}

export type Post = {
  id: string
  title: string
  slug: string
  preview: string
  publishedAt: string
  image: Image
  writer: Writer
}

export type Model = {
  id: string
  title: string
  slug: string
  posts: Post[]
}
