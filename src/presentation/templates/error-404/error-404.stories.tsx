import { Story, Meta } from '@storybook/react'
import { Error404, Error404Props } from './error-404'

export default {
  title: 'templates/Error404',
  component: Error404,
} as Meta

export const Default: Story<Error404Props> = (args) => <Error404 {...args} />
