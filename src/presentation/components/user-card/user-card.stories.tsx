import { Story, Meta } from '@storybook/react'
import { makeUserCommonMock } from 'domain/models/common/user/mock'
import { UserCard, UserCardProps } from './user-card'

export default {
  title: 'components/UserCard',
  component: UserCard,
} as Meta

export const Default: Story<UserCardProps> = (args) => <UserCard {...args} />

Default.args = {
  userData: makeUserCommonMock(),
}
