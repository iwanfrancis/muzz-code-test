import { render, screen } from '@/testing/test-utils'
import { describe, it, expect } from 'vitest'
import MessageItem from './MessageItem'
import type { Message } from '@/types'

const createMockMessage = (overrides: Partial<Message> = {}): Message => ({
  id: 1,
  senderId: 1,
  recipientId: 2,
  content: 'Hello, this is a test message!',
  timestamp: '2025-01-01T12:00:00Z',
  ...overrides,
})

describe('MessageItem', () => {
  const currentUserId = 1
  const otherUserId = 2

  describe('basic rendering', () => {
    it('renders the message content', () => {
      const message = createMockMessage()
      render(<MessageItem currentUserId={currentUserId} message={message} />)

      expect(screen.getByText(message.content)).toBeInTheDocument()
    })
  })

  describe('message grouping styles', () => {
    it('applies no grouping styles when message is standalone', () => {
      const message = createMockMessage({ senderId: currentUserId })
      render(<MessageItem currentUserId={currentUserId} message={message} />)

      const messageElement = screen.getByText(message.content)
      expect(messageElement).toHaveClass('mb-3') // not grouped with previous
      expect(messageElement).toHaveClass('rounded-br-none') // not grouped with next (current user)
    })

    it('applies grouping styles when message is grouped', () => {
      const message = createMockMessage({ senderId: currentUserId })
      render(
        <MessageItem
          currentUserId={currentUserId}
          message={message}
          isGrouped
        />
      )

      const messageElement = screen.getByText(message.content)
      expect(messageElement).toHaveClass('mb-[1px]')
      expect(messageElement).not.toHaveClass('rounded-br-none')
    })

    it('applies correct corner rounding for other user messages', () => {
      const message = createMockMessage({ senderId: otherUserId })
      render(<MessageItem currentUserId={currentUserId} message={message} />)

      const messageElement = screen.getByText(message.content)
      expect(messageElement).toHaveClass('rounded-bl-none') // other user, not grouped with next
      expect(messageElement).not.toHaveClass('rounded-br-none')
    })
  })
})
