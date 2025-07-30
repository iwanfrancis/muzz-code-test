import { render, screen } from '@/testing/test-utils'
import { describe, it, expect, vi } from 'vitest'
import UserListSection from './UserListSection'
import type { User } from '@/types'

const mockUsers: User[] = [
  { id: 1, name: 'John Doe', profile: 'Software Engineer' },
  { id: 2, name: 'Jane Smith', profile: 'Product Manager' },
  { id: 3, name: 'Bob Johnson', profile: 'Designer' },
]

describe('UserListSection', () => {
  const defaultProps = {
    title: 'Test Section',
    users: mockUsers,
    currentUserId: 1,
    onUserAction: vi.fn(),
    actionLabel: vi.fn((_user: User, isCurrentUser: boolean) =>
      isCurrentUser ? 'Current User' : 'Action'
    ),
  }

  it('renders the title', () => {
    render(<UserListSection {...defaultProps} />)

    expect(screen.getByText('Test Section')).toBeInTheDocument()
  })

  it('renders all users', () => {
    render(<UserListSection {...defaultProps} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
  })

  it('shows correct action labels for current and other users', () => {
    render(<UserListSection {...defaultProps} />)

    // Current user should show "Current User"
    const currentUserButton = screen.getByRole('button', {
      name: 'Current User',
    })
    expect(currentUserButton).toBeInTheDocument()
    expect(currentUserButton).toBeDisabled()

    // Other users should show "Action"
    const actionButtons = screen.getAllByRole('button', { name: 'Action' })
    expect(actionButtons).toHaveLength(2)
    actionButtons.forEach((button) => {
      expect(button).not.toBeDisabled()
    })
  })

  it('calls onUserAction when action button is clicked', async () => {
    const mockOnUserAction = vi.fn()
    const { user } = render(
      <UserListSection {...defaultProps} onUserAction={mockOnUserAction} />
    )

    const actionButtons = screen.getAllByRole('button', { name: 'Action' })
    await user.click(actionButtons[0])

    expect(mockOnUserAction).toHaveBeenCalledWith(mockUsers[1]) // Jane Smith (not current user)
  })

  it('does not call onUserAction when current user button is clicked', async () => {
    const mockOnUserAction = vi.fn()
    const { user } = render(
      <UserListSection {...defaultProps} onUserAction={mockOnUserAction} />
    )

    const currentUserButton = screen.getByRole('button', {
      name: 'Current User',
    })
    await user.click(currentUserButton)

    expect(mockOnUserAction).not.toHaveBeenCalled()
  })

  it('handles custom action labels correctly', () => {
    const customActionLabel = vi.fn((user: User, isCurrentUser: boolean) =>
      isCurrentUser ? 'You' : `Message ${user.name}`
    )

    render(
      <UserListSection {...defaultProps} actionLabel={customActionLabel} />
    )

    expect(screen.getByRole('button', { name: 'You' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Message Jane Smith' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Message Bob Johnson' })
    ).toBeInTheDocument()
  })

  it('renders empty state when no users provided', () => {
    render(<UserListSection {...defaultProps} users={[]} />)

    expect(screen.getByText('Test Section')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
