import { Story, Meta } from '@storybook/react'
import { makeTagDetails } from 'domain/models/tag/details/mock'
import { TagPosts, TagPostsProps } from './tag-posts'

export default {
  title: 'templates/TagPosts',
  component: TagPosts,
} as Meta

export const Default: Story<TagPostsProps> = (args) => <TagPosts {...args} />

Default.args = {
  tag: makeTagDetails(),
}
