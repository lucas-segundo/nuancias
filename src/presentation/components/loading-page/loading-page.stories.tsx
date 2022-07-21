import { Story, Meta } from '@storybook/react'
import LoadingPage from './loading-page'

export default {
  title: 'components/LoadingPage',
  component: LoadingPage,
} as Meta

export const Default: Story = (args) => <LoadingPage {...args} />
