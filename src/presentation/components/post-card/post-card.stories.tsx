import { Story, Meta } from '@storybook/react'
import { makePostCardsMock } from 'domain/models/post/mock'
import PostCard, { PostCardProps } from './post-card'

export default {
  title: 'components/PostCard',
  component: PostCard,
} as Meta

export const Default: Story<PostCardProps> = (args) => <PostCard {...args} />

Default.args = {
  post: makePostCardsMock()[0],
}
