import { Story, Meta } from '@storybook/react'
import { makeWriterCardMock } from 'domain/models/writer/writer-card/mock'
import { UserCard, UserCardProps } from './user-card'

export default {
  title: 'components/UserCard',
  component: UserCard,
} as Meta

export const Default: Story<UserCardProps> = (args) => <UserCard {...args} />

Default.args = {
  userData: makeWriterCardMock(),
}
