import { Story, Meta } from '@storybook/react'
import { makePostPageMock } from 'domain/models/post/post-page/mock'
import { makeWriterCardMock } from 'domain/models/writer/writer-card/mock'
import { Post, PostProps } from './post'

export default {
  title: 'templates/Post',
  component: Post,
} as Meta

export const Default: Story<PostProps> = (args) => <Post {...args} />

Default.args = {
  userData: makeWriterCardMock(),
  postData: makePostPageMock(),
}
