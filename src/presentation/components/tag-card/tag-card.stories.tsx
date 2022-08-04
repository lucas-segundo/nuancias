import { Story, Meta } from '@storybook/react'
import { makeTagPreview } from 'domain/models/tag/preview/mock'
import { TagCard, TagCardProps } from './tag-card'

export default {
  title: 'components/TagCard',
  component: TagCard,
} as Meta

export const Default: Story<TagCardProps> = (args) => <TagCard {...args} />

Default.args = {
  tag: makeTagPreview(),
}
