import { Story, Meta } from '@storybook/react'
import { makeWriterPageMock } from 'domain/models/writer/writer-page/mock'
import { WriterPosts, WriterPostsProps } from './writer-posts'

export default {
  title: 'templates/WriterPosts',
  component: WriterPosts,
} as Meta

export const Default: Story<WriterPostsProps> = (args) => (
  <WriterPosts {...args} />
)

Default.args = {
  writer: makeWriterPageMock(),
}
