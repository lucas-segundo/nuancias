import { faker } from '@faker-js/faker'
import { TagPreviewModel } from 'domain/models'

export const makeTagPreview = (): TagPreviewModel.Model => ({
  id: faker.datatype.uuid(),
  slug: faker.datatype.uuid(),
  title: faker.random.words(),
})
