import { Story, Meta } from '@storybook/react'
import { makeSearchedPostMock } from 'domain/models/post/searched-post/mock'
import { PostItem, PostItemProps } from './post-item'

export default {
  title: 'components/PostItem',
  component: PostItem,
} as Meta

export const Default: Story<PostItemProps> = (args) => <PostItem {...args} />

Default.args = {
  post: makeSearchedPostMock('Seached text'),
}
