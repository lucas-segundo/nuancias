import { Story, Meta } from '@storybook/react'
import { Footer } from './footer'

export default {
  title: 'components/Footer',
  component: Footer,
} as Meta

export const Default: Story = (args) => <Footer {...args} />
