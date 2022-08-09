import { Story, Meta } from '@storybook/react'
import { Contacts, ContactsProps } from './contacts'

export default {
  title: 'templates/Contacts',
  component: Contacts,
} as Meta

export const Default: Story<ContactsProps> = (args) => <Contacts {...args} />
