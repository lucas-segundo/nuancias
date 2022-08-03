export type Image = {
  src: string
}

export type Tag = {
  id: string
  title: string
  slug: string
}

export type Post = {
  id: string
  title: string
  slug: string
  preview: string
  publishedAt: string
  image: Image
  tags: Tag[]
}

export type Model = {
  id: string
  name: string
  username: string
  bio: string
  avatar: Image
  posts: Post[]
}
