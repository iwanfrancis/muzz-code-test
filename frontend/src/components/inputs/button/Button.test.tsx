import { render, screen } from '@/testing/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    const { user } = render(<Button onClick={handleClick}>Click me</Button>)

     
    await user.click(screen.getByRole('button', { name: 'Click me' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled()
  })

  it('accepts custom className', () => {
    render(<Button className="custom-class">Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toHaveClass(
      'custom-class'
    )
  })

  it('forwards ref to button element', () => {
    const ref = { current: null }
    const { container } = render(<Button ref={ref}>Click me</Button>)

    // Test that ref is forwarded by checking the button exists
     
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
    expect(ref.current).toBe(button)
  })

  it('accepts all native button props', () => {
    render(
      <Button type="submit" form="test-form" aria-label="Submit form">
        Submit
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Submit form' })
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveAttribute('form', 'test-form')
    expect(button).toHaveAttribute('aria-label', 'Submit form')
  })
})
