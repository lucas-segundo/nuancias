import { Story, Meta } from '@storybook/react'
import { makeUserCommonMock } from 'domain/models/common/user/mock'
import { makePostPageMock } from 'domain/models/post/mock'
import Post, { PostProps } from './post'

export default {
  title: 'templates/Post',
  component: Post,
} as Meta

export const Default: Story<PostProps> = (args) => <Post {...args} />

Default.args = {
  userData: makeUserCommonMock(),
  postData: makePostPageMock(),
}
