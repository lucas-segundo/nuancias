import { Story, Meta } from '@storybook/react'
import { AboutUs, AboutUsProps } from './about-us'

export default {
  title: 'templates/AboutUs',
  component: AboutUs,
} as Meta

export const Default: Story<AboutUsProps> = (args) => <AboutUs {...args} />
