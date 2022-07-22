import { Story, Meta } from '@storybook/react'
import { Base, BaseProps } from './base'

export default {
  title: 'layouts/Base',
  component: Base,
} as Meta

export const Default: Story<BaseProps> = (args) => <Base {...args} />
