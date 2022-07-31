import { Story, Meta } from '@storybook/react'
import { makePostCardsMock } from 'domain/models/post/post-card/mock'
import { PostCard, PostCardProps } from './post-card'

export default {
  title: 'components/PostCard',
  component: PostCard,
} as Meta

export const Default: Story<PostCardProps> = (args) => <PostCard {...args} />

const post = makePostCardsMock()[0]

Default.args = {
  post,
  postImage: post.image,
  tags: post.tags,
  writer: post.writer,
}
