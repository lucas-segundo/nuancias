export type Avatar = {
  id: string
  url: string
}

export type User = {
  id: string | number
}

export type Model = {
  acessToken: string
  user: User
}
