import { Story, Meta } from '@storybook/react'
import { makePostPreviewMock } from 'domain/models/post/preview/mock'
import { PostCard, PostCardProps } from './post-card'

export default {
  title: 'components/PostCard',
  component: PostCard,
} as Meta

export const Default: Story<PostCardProps> = (args) => <PostCard {...args} />

const post = makePostPreviewMock()

Default.args = {
  post,
  postImage: post.image,
  tags: post.tags,
  writer: post.writer,
}
