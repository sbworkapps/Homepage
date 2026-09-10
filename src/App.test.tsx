import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('SBoyle portfolio', () => {
  it('renders the services-led homepage and contact form', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /websites that work/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /useful, not complicated/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Contact' })[0]).toHaveAttribute('href', '#contact')
    expect(screen.getByLabelText('Name')).toHaveAttribute('name', 'name')
    expect(screen.getByLabelText('Email')).toHaveAttribute('name', 'email')
    expect(screen.getByLabelText('Message')).toHaveAttribute('name', 'message')
  })

  it('opens and closes the mobile navigation', () => {
    render(<App />)
    const menu = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation')).toHaveTextContent('Contact')
    fireEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'false')
  })

  it('uses the revised approach steps', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Plan' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Support' })).toBeInTheDocument()
  })

  it('prevents duplicate submissions while Basin is processing the contact form', () => {
    render(<App />)
    const form = screen.getByRole('form', { name: /have a project in mind/i })
    const submit = screen.getByRole('button', { name: /send message/i })
    fireEvent.submit(form)
    expect(submit).toBeDisabled()
    fireEvent(document, new CustomEvent('basinjsFormSuccess', { detail: { form } }))
    expect(submit).toBeEnabled()
  })
})
