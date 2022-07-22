import { Story, Meta } from '@storybook/react'
import { SignIn, SignInProps } from './sign-in'

export default {
  title: 'templates/SignIn',
  component: SignIn,
} as Meta

export const Default: Story<SignInProps> = (args) => <SignIn {...args} />
