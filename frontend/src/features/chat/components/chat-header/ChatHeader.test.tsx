import { render, screen } from '@/testing/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ChatHeader from './ChatHeader'
import { useChatData } from '../../hooks/useChat'

// Mock the chat hooks
const mockNavigateHome = vi.fn()
const mockChatData = {
  currentUser: {
    id: 1,
    name: 'Alisha',
    profile: 'https://randomuser.me/api/portraits/women/89.jpg',
  },
  currentRecipient: {
    id: 2,
    name: 'John Doe',
    profile: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  messages: [],
}

vi.mock('../../hooks/useChat', () => ({
  useChatActions: () => ({
    navigateHome: mockNavigateHome,
  }),
  useChatData: vi.fn(() => mockChatData),
}))

const mockedUseChatData = vi.mocked(useChatData)

describe('ChatHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedUseChatData.mockReturnValue(mockChatData)
  })

  it('renders the current recipient user card', () => {
    render(<ChatHeader />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders back button and menu button', () => {
    render(<ChatHeader />)

    // Check for icons by their class names since they are SVGs with aria-hidden
    const backButton = document.querySelector('.lucide-chevron-left')
    const menuButton = document.querySelector('.lucide-ellipsis')

    expect(backButton).toBeInTheDocument()
    expect(menuButton).toBeInTheDocument()

    // Check they have cursor-pointer class
    expect(backButton).toHaveClass('cursor-pointer')
    expect(menuButton).toHaveClass('cursor-pointer')
  })

  it('calls navigateHome when back button is clicked', async () => {
    const { user } = render(<ChatHeader />)

    const backButton = document.querySelector('.lucide-chevron-left')
    await user.click(backButton!)

    expect(mockNavigateHome).toHaveBeenCalledTimes(1)
  })

  it('returns null when no current recipient', () => {
    mockedUseChatData.mockReturnValue({
      ...mockChatData,
      currentRecipient: null,
    })

    const { container } = render(<ChatHeader />)

    expect(container.firstChild).toBeNull()
  })

  it('returns null when no current user', () => {
    mockedUseChatData.mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      currentUser: null as any,
      currentRecipient: mockChatData.currentRecipient,
      messages: [],
    })

    const { container } = render(<ChatHeader />)

    expect(container.firstChild).toBeNull()
  })
})
