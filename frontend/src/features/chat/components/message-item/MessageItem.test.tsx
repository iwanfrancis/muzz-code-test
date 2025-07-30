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
      render(
        <MessageItem
          currentUserId={currentUserId}
          message={message}
          prevMessage={null}
          nextMessage={null}
        />
      )

      expect(screen.getByText(message.content)).toBeInTheDocument()
    })
  })

  describe('message grouping styles', () => {
    it('applies no grouping styles when message is standalone', () => {
      const message = createMockMessage({ senderId: currentUserId })
      render(
        <MessageItem
          currentUserId={currentUserId}
          message={message}
          prevMessage={null}
          nextMessage={null}
        />
      )

      const messageElement = screen.getByText(message.content)
      expect(messageElement).toHaveClass('mt-3') // not grouped with previous
      expect(messageElement).toHaveClass('rounded-br-none') // not grouped with next (current user)
    })

    it('applies grouped with previous styles when messages are from same sender within time threshold', () => {
      const baseTime = '2025-01-01T12:00:00Z'
      const prevMessage = createMockMessage({
        id: 1,
        senderId: currentUserId,
        timestamp: baseTime,
      })
      const message = createMockMessage({
        id: 2,
        senderId: currentUserId,
        timestamp: '2025-01-01T12:00:10Z', // 10 seconds later
      })

      render(
        <MessageItem
          currentUserId={currentUserId}
          message={message}
          prevMessage={prevMessage}
          nextMessage={null}
        />
      )

      const messageElement = screen.getByText(message.content)
      expect(messageElement).toHaveClass('mt-[1px]') // grouped with previous
      expect(messageElement).not.toHaveClass('mt-3')
    })

    it('applies grouped with next styles when current message and next are from same sender', () => {
      const baseTime = '2025-01-01T12:00:00Z'
      const message = createMockMessage({
        id: 1,
        senderId: currentUserId,
        timestamp: baseTime,
      })
      const nextMessage = createMockMessage({
        id: 2,
        senderId: currentUserId,
        timestamp: '2025-01-01T12:00:10Z', // 10 seconds later
      })

      render(
        <MessageItem
          currentUserId={currentUserId}
          message={message}
          prevMessage={null}
          nextMessage={nextMessage}
        />
      )

      const messageElement = screen.getByText(message.content)
      // Should not have rounded corner for grouped messages
      expect(messageElement).not.toHaveClass('rounded-br-none')
    })

    it('applies correct corner rounding for other user messages', () => {
      const message = createMockMessage({ senderId: otherUserId })
      render(
        <MessageItem
          currentUserId={currentUserId}
          message={message}
          prevMessage={null}
          nextMessage={null}
        />
      )

      const messageElement = screen.getByText(message.content)
      expect(messageElement).toHaveClass('rounded-bl-none') // other user, not grouped with next
      expect(messageElement).not.toHaveClass('rounded-br-none')
    })
  })

  describe('message grouping logic integration', () => {
    it('does not group messages from different senders', () => {
      const prevMessage = createMockMessage({
        id: 1,
        senderId: otherUserId,
        timestamp: '2025-01-01T12:00:00Z',
      })
      const message = createMockMessage({
        id: 2,
        senderId: currentUserId,
        timestamp: '2025-01-01T12:00:05Z', // 5 seconds later, same sender
      })

      render(
        <MessageItem
          currentUserId={currentUserId}
          message={message}
          prevMessage={prevMessage}
          nextMessage={null}
        />
      )

      const messageElement = screen.getByText(message.content)
      expect(messageElement).toHaveClass('mt-3') // not grouped due to different sender
    })

    it('does not group messages when time threshold is exceeded', () => {
      const prevMessage = createMockMessage({
        id: 1,
        senderId: currentUserId,
        timestamp: '2025-01-01T12:00:00Z',
      })
      const message = createMockMessage({
        id: 2,
        senderId: currentUserId,
        timestamp: '2025-01-01T12:00:30Z', // 30 seconds later (exceeds 20s threshold)
      })

      render(
        <MessageItem
          currentUserId={currentUserId}
          message={message}
          prevMessage={prevMessage}
          nextMessage={null}
        />
      )

      const messageElement = screen.getByText(message.content)
      expect(messageElement).toHaveClass('mt-3') // not grouped due to time threshold
    })

    it('handles complex grouping scenarios', () => {
      const prevMessage = createMockMessage({
        id: 1,
        senderId: currentUserId,
        timestamp: '2025-01-01T12:00:00Z',
      })
      const message = createMockMessage({
        id: 2,
        senderId: currentUserId,
        timestamp: '2025-01-01T12:00:10Z', // 10 seconds later
      })
      const nextMessage = createMockMessage({
        id: 3,
        senderId: currentUserId,
        timestamp: '2025-01-01T12:00:15Z', // 5 seconds after current
      })

      render(
        <MessageItem
          currentUserId={currentUserId}
          message={message}
          prevMessage={prevMessage}
          nextMessage={nextMessage}
        />
      )

      const messageElement = screen.getByText(message.content)
      // Should be grouped with both previous and next
      expect(messageElement).toHaveClass('mt-[1px]') // grouped with previous
      expect(messageElement).not.toHaveClass('rounded-br-none') // grouped with next
    })
  })

  describe('edge cases', () => {
    it('handles null previous and next messages', () => {
      const message = createMockMessage()

      expect(() => {
        render(
          <MessageItem
            currentUserId={currentUserId}
            message={message}
            prevMessage={null}
            nextMessage={null}
          />
        )
      }).not.toThrow()

      expect(screen.getByText(message.content)).toBeInTheDocument()
    })
  })
})
