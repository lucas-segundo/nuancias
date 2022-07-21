import { convert } from 'html-to-text'

type Params = {
  html: string
  characterCount: number
}

export const getCharactersFromHTML = ({ html, characterCount }: Params) => {
  const text = convert(html, {
    wordwrap: false,
  })

  return text.slice(0, characterCount)
}
