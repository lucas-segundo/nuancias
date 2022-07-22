import { Story, Meta } from '@storybook/react'
import { LastPosts } from './last-posts'

export default {
  title: 'components/LastPosts',
  component: LastPosts,
} as Meta

export const Default: Story = (args) => <LastPosts {...args} />
