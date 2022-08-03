export type Image = {
  src: string
}

export type Writer = {
  name: string
  bio: string
  username: string
  avatar: Image
}

export type Tag = {
  id: string
  title: string
  slug: string
}

export type Model = {
  id: string
  title: string
  preview: string
  content: string
  publishedAt: string
  image: Image
  writer: Writer
  tags: Tag[]
}
