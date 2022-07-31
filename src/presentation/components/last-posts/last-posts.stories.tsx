import { Story, Meta } from '@storybook/react'
import { makePostPreviewMock } from 'domain/models/post/preview/mock'
import { LastPosts, LastPostsProps } from './last-posts'

export default {
  title: 'components/LastPosts',
  component: LastPosts,
} as Meta

export const Default: Story<LastPostsProps> = (args) => <LastPosts {...args} />

const posts = [
  makePostPreviewMock(),
  makePostPreviewMock(),
  makePostPreviewMock(),
  makePostPreviewMock(),
  makePostPreviewMock(),
  makePostPreviewMock(),
]

Default.args = {
  posts,
}
