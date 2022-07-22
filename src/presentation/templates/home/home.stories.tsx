import { Story, Meta } from '@storybook/react'
import { Home, HomeProps } from './home'

export default {
  title: 'templates/Home',
  component: Home,
} as Meta

export const Default: Story<HomeProps> = (args) => <Home {...args} />
