import { Story, Meta } from '@storybook/react'
import { makePostCardsMock } from 'domain/models/post/post-card/mock'
import { Home, HomeProps } from './home'

export default {
  title: 'templates/Home',
  component: Home,
} as Meta

export const Default: Story<HomeProps> = (args) => <Home {...args} />

Default.args = {
  posts: makePostCardsMock(),
}
