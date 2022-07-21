export const makePostLink = (username: string, slug: string) => {
  return `/@${username}/${slug}`
}

export const makeUserLink = (username: string) => {
  return `/@${username}`
}
