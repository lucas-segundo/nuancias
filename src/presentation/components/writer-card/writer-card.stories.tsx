import { Story, Meta } from '@storybook/react'
import { makeWriterCardMock } from 'domain/models/writer/writer-card/mock'
import { WriterCard, WriterCardProps } from './writer-card'

export default {
  title: 'components/WriterCard',
  component: WriterCard,
} as Meta

export const Default: Story<WriterCardProps> = (args) => (
  <WriterCard {...args} />
)

Default.args = {
  writer: makeWriterCardMock(),
}
