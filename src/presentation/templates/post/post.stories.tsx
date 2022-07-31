import { Story, Meta } from '@storybook/react'
import { makePostContentMock } from 'domain/models/post/content/mock'
import { makeWriterCardMock } from 'domain/models/writer/preview/mock'
import { Post, PostProps } from './post'

export default {
  title: 'templates/Post',
  component: Post,
} as Meta

export const Default: Story<PostProps> = (args) => <Post {...args} />

Default.args = {
  writer: makeWriterCardMock(),
  postData: makePostContentMock(),
}
