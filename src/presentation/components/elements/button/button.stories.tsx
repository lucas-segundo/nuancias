import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps } from './button'

export default {
  title: 'components/elements/Button',
  component: Button,
} as Meta

export const Default: Story<ButtonProps> = (args) => <Button {...args} />
