import { Story, Meta } from '@storybook/react'
import Error500, { Error500Props } from './error-500'

export default {
  title: 'templates/Error500',
  component: Error500,
} as Meta

export const Default: Story<Error500Props> = (args) => <Error500 {...args} />
