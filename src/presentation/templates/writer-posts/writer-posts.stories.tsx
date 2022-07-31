import { Story, Meta } from '@storybook/react'
import { makeWriterDetailsMock } from 'domain/models/writer/details/mock'
import { WriterPosts, WriterPostsProps } from './writer-posts'

export default {
  title: 'templates/WriterPosts',
  component: WriterPosts,
} as Meta

export const Default: Story<WriterPostsProps> = (args) => (
  <WriterPosts {...args} />
)

Default.args = {
  writer: makeWriterDetailsMock(),
}
