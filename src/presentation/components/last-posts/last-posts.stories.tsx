import { Story, Meta } from '@storybook/react'
import { makePostCardsMock } from 'domain/models/post/post-card/mock'
import { LastPosts, LastPostsProps } from './last-posts'

export default {
  title: 'components/LastPosts',
  component: LastPosts,
} as Meta

export const Default: Story<LastPostsProps> = (args) => <LastPosts {...args} />

Default.args = {
  posts: makePostCardsMock(),
}
