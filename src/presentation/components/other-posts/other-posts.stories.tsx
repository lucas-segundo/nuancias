import { Story, Meta } from '@storybook/react'
import { makePostCardsMock } from 'domain/models/post/post-card/mock'
import { OtherPosts, OtherPostsProps } from './other-posts'

export default {
  title: 'components/OtherPosts',
  component: OtherPosts,
} as Meta

export const Default: Story<OtherPostsProps> = (args) => (
  <OtherPosts {...args} />
)

Default.args = {
  posts: makePostCardsMock(),
}
