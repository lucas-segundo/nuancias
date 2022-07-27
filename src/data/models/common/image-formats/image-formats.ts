type Image = {
  url: string
}

export type ImageFormats =
  | {
      thumbnail?: Image
      small?: Image
      medium?: Image
      large?: Image
    }
  | undefined
