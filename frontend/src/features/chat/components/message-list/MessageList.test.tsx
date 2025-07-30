import { render, screen, waitFor } from '@/testing/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MessageList from './MessageList'
import type { Message } from '@/types'
import { useChatData } from '../../hooks/useChat'

// Mock the chat hooks
const mockSendMessage = vi.fn()
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
  messages: [
    {
      id: 1,
      senderId: 1,
      recipientId: 2,
      content: 'Hello there!',
      timestamp: '2024-01-01T12:00:00Z',
    },
    {
      id: 2,
      senderId: 2,
      recipientId: 1,
      content: 'Hi! How are you?',
      timestamp: '2024-01-01T12:01:00Z',
    },
  ] as Message[],
}

vi.mock('../../hooks/useChat', () => ({
  useChatActions: () => ({
    sendMessage: mockSendMessage,
  }),
  useChatData: vi.fn(() => mockChatData),
}))

const mockedUseChatData = vi.mocked(useChatData)

describe('MessageList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedUseChatData.mockReturnValue(mockChatData)
  })

  it('renders all messages', () => {
    render(<MessageList />)

    expect(screen.getByText('Hello there!')).toBeInTheDocument()
    expect(screen.getByText('Hi! How are you?')).toBeInTheDocument()
  })

  it('renders input field with correct placeholder', () => {
    render(<MessageList />)

    const input = screen.getByPlaceholderText('Message John Doe')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('allows typing in the input field', async () => {
    const { user } = render(<MessageList />)

    const input = screen.getByPlaceholderText('Message John Doe')
    await user.type(input, 'Test message')

    expect(input).toHaveValue('Test message')
  })

  it('sends message when form is submitted', async () => {
    const { user } = render(<MessageList />)

    const input = screen.getByPlaceholderText('Message John Doe')
    await user.type(input, 'Test message')
    await user.keyboard('{Enter}')

    expect(mockSendMessage).toHaveBeenCalledWith({
      senderId: 1,
      recipientId: 2,
      content: 'Test message',
    })
  })

  it('clears input after sending message', async () => {
    const { user } = render(<MessageList />)

    const input = screen.getByPlaceholderText('Message John Doe')
    await user.type(input, 'Test message')
    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })

  it('does not send empty messages', async () => {
    const { user } = render(<MessageList />)

    const input = screen.getByPlaceholderText('Message John Doe')
    await user.type(input, '   ') // Only whitespace
    await user.keyboard('{Enter}')

    expect(mockSendMessage).not.toHaveBeenCalled()
  })

  it('does not send message if no recipient is selected', async () => {
    mockedUseChatData.mockReturnValue({
      ...mockChatData,
      currentRecipient: null,
    })

    render(<MessageList />)

    expect(screen.queryByPlaceholderText(/Message/)).not.toBeInTheDocument()
    expect(screen.getByText('No recipient selected')).toBeInTheDocument()
  })

  it('shows "No recipient selected" when no recipient', () => {
    mockedUseChatData.mockReturnValue({
      ...mockChatData,
      currentRecipient: null,
    })

    render(<MessageList />)

    expect(screen.getByText('No recipient selected')).toBeInTheDocument()
    expect(screen.queryByText('Hello there!')).not.toBeInTheDocument()
  })

  it('renders empty message list correctly', () => {
    mockedUseChatData.mockReturnValue({
      ...mockChatData,
      messages: [],
    })

    render(<MessageList />)

    expect(screen.getByPlaceholderText('Message John Doe')).toBeInTheDocument()
    expect(screen.queryByText('Hello there!')).not.toBeInTheDocument()
  })

  it('has correct layout structure', () => {
    const { container } = render(<MessageList />)

    const mainContainer = container.firstChild
    expect(mainContainer).toHaveClass('flex-1', 'flex', 'flex-col')
  })

  it('message container has overflow and max height classes', () => {
    render(<MessageList />)

    // Check for the message container classes
    const messageContainer = document.querySelector(
      '.overflow-auto.max-h-\\[490px\\]'
    )
    expect(messageContainer).toBeInTheDocument()
  })
})
