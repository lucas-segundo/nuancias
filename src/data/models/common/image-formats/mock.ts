import { faker } from '@faker-js/faker'
import { ImageFormats } from './image-formats'

const makeUrl = () => faker.image.abstract()

export const makeImageFormats = (): ImageFormats => ({
  large: {
    url: makeUrl(),
  },
  medium: {
    url: makeUrl(),
  },
  small: {
    url: makeUrl(),
  },
  thumbnail: {
    url: makeUrl(),
  },
})
