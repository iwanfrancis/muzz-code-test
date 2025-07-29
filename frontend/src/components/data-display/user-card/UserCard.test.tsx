import { describe, it, expect } from 'vitest'
import UserCard from './UserCard'
import type { User } from '@/store/user.store'
import { render, screen } from '@/testing/test-utils'

describe('UserCard', () => {
  const mockUser: User = {
    name: 'Jane Doe',
    profile: 'https://example.com/jane.jpg',
    // add other User properties if needed
  } as User

  it('renders the user name', () => {
    render(<UserCard user={mockUser} />)
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('renders the user profile image with correct src and alt', () => {
    render(<UserCard user={mockUser} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', mockUser.profile)
    expect(img).toHaveAttribute('alt', mockUser.name)
  })

  it('renders a rounded profile image', () => {
    render(<UserCard user={mockUser} />)
    const img = screen.getByRole('img')
    expect(img).toHaveClass('rounded-full')
  })
})
