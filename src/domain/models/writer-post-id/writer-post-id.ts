export type Post = {
  id: string
  slug: string
}
export type Writer = {
  id: string
  username: string
}

export type Model = {
  post: Post
  writer: Writer
}
