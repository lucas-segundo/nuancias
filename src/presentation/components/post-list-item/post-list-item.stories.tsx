import { Story, Meta } from '@storybook/react'
import { makePostCardsMock } from 'domain/models/post/mock'
import { PostListItem, PostListItemProps } from './post-list-item'

export default {
  title: 'components/PostListItem',
  component: PostListItem,
} as Meta

export const Default: Story<PostListItemProps> = (args) => (
  <PostListItem {...args} />
)

Default.args = {
  post: makePostCardsMock()[0],
}
