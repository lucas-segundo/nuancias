import { Story, Meta } from '@storybook/react'
import PostTag, { PostTagProps } from './post-tag'

export default {
  title: 'components/PostTag',
  component: PostTag,
} as Meta

export const Default: Story<PostTagProps> = (args) => <PostTag {...args} />
