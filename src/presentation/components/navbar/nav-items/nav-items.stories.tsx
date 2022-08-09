import { Story, Meta } from '@storybook/react'
import { NavItems, NavItemsProps } from './nav-items'

export default {
  title: 'components/NavItems',
  component: NavItems,
} as Meta

export const Default: Story<NavItemsProps> = (args) => <NavItems {...args} />
