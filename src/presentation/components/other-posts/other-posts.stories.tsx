import { Story, Meta } from '@storybook/react'
import { makePostPreviewMock } from 'domain/models/post/preview/mock'
import { OtherPosts, OtherPostsProps } from './other-posts'

export default {
  title: 'components/OtherPosts',
  component: OtherPosts,
} as Meta

export const Default: Story<OtherPostsProps> = (args) => (
  <OtherPosts {...args} />
)

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
