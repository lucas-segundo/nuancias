import { Story, Meta } from '@storybook/react'
import { SignInForm, SignInFormProps } from './sign-in-form'

export default {
  title: 'components/SignInForm',
  component: SignInForm,
} as Meta

export const Default: Story<SignInFormProps> = (args) => (
  <SignInForm {...args} />
)
