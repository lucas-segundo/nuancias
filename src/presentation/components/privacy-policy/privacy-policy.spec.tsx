import { fireEvent, render, screen } from '@testing-library/react'
import Cookies from 'js-cookie'
import React from 'react'
import { PrivacyPolicy } from './privacy-policy'

describe('<PrivacyPolicy />', () => {
  afterEach(() => {
    Cookies.remove('privacy-policy')
  })

  it('should handle the open/close component without cookie', () => {
    render(<PrivacyPolicy />)

    const privacyPolicy = screen.getByLabelText('Política de Privacidade')
    expect(privacyPolicy).not.toHaveClass('hidden')

    fireEvent.click(screen.getByRole('button'))
    expect(privacyPolicy).toHaveClass('hidden')
  })

  it('should render hidden with cookie', () => {
    Cookies.set('privacy-policy', 'agree')
    render(<PrivacyPolicy />)

    const privacyPolicy = screen.getByLabelText('Política de Privacidade')
    expect(privacyPolicy).toHaveClass('hidden')
  })
})
