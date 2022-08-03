export type Writer = {
  username: string
}

export type Model = {
  id: string
  title: string
  slug: string
  writer: Writer
}
