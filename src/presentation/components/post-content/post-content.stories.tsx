import { Story, Meta } from '@storybook/react'
import { makePostContentMock } from 'domain/models/post/content/mock'
import { PostContent, PostContentProps } from './post-content'

export default {
  title: 'components/PostContent',
  component: PostContent,
} as Meta

export const Default: Story<PostContentProps> = (args) => (
  <PostContent {...args} />
)

Default.args = {
  postData: makePostContentMock(),
}
