import { Story, Meta } from '@storybook/react'
import { makeTagPreview } from 'domain/models/tag/preview/mock'
import { GroupedTags, GroupedTagsProps } from './grouped-tags'

export default {
  title: 'components/GroupedTags',
  component: GroupedTags,
} as Meta

export const Default: Story<GroupedTagsProps> = (args) => (
  <GroupedTags {...args} />
)

Default.args = {
  tags: [
    makeTagPreview(),
    makeTagPreview(),
    makeTagPreview(),
    makeTagPreview(),
    makeTagPreview(),
  ],
}
