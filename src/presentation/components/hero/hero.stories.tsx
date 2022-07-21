import { Story, Meta } from '@storybook/react'
import Hero from './hero'

export default {
  title: 'components/Hero',
  component: Hero,
} as Meta

export const Default: Story = (args) => <Hero {...args} />
