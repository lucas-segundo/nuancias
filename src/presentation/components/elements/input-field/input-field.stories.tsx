import { Story, Meta } from '@storybook/react'
import { InputField, InputFieldProps } from './input-field'

export default {
  title: 'components/elements/InputField',
  component: InputField,
} as Meta

export const Default: Story<InputFieldProps> = (args) => (
  <InputField {...args} />
)
