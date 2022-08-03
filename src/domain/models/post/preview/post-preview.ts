export type Image = {
  src: string
}

export type Writer = {
  name: string
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
  slug: string
  preview: string
  publishedAt: string
  image: Image
  writer: Writer
  tags: Tag[]
}
