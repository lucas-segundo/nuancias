import { Story, Meta } from '@storybook/react'
import { Contacts } from './contacts'

export default {
  title: 'templates/Contacts',
  component: Contacts,
} as Meta

export const Default: Story = (args) => <Contacts {...args} />
