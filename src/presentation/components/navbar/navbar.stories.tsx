import { Story, Meta } from '@storybook/react'
import Navbar, { NavbarProps } from './navbar'

export default {
  title: 'components/Navbar',
  component: Navbar,
} as Meta

export const Default: Story<NavbarProps> = (args) => <Navbar {...args} />
