import { Story, Meta } from '@storybook/react'
import { AboutUs } from './about-us'

export default {
  title: 'templates/AboutUs',
  component: AboutUs,
} as Meta

export const Default: Story = (args) => <AboutUs {...args} />
