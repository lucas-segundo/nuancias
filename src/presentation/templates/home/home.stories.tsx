import { Story, Meta } from '@storybook/react'
import { makePostPreviewMock } from 'domain/models/post/preview/mock'
import { Home, HomeProps } from './home'

export default {
  title: 'templates/Home',
  component: Home,
} as Meta

export const Default: Story<HomeProps> = (args) => <Home {...args} />

const posts = [
  makePostPreviewMock(),
  makePostPreviewMock(),
  makePostPreviewMock(),
  makePostPreviewMock(),
  makePostPreviewMock(),
  makePostPreviewMock(),
]

Default.args = {
  posts,
}
