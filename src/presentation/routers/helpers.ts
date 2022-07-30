export const makePostLink = (username: string, slug: string) => {
  return `/@${username}/${slug}`
}

export const makeWriterLink = (username: string) => {
  return `/@${username}`
}
