import { TagModel } from 'domain/models/common'

export type Model = Pick<TagModel, 'id' | 'slug' | 'title'>
