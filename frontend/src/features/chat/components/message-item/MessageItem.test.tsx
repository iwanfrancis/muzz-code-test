import { render, screen } from '@/testing/test-utils'
import { describe, it, expect } from 'vitest'
import MessageItem from './MessageItem'
import type { Message } from '@/types'

const mockMessage: Message = {
  id: 1,
  senderId: 1,
  recipientId: 2,
  content: 'Hello, this is a test message!',
  timestamp: '2024-01-01T12:00:00Z',
}

describe('MessageItem', () => {
  it('renders the message content', () => {
    render(<MessageItem message={mockMessage} />)

    expect(
      screen.getByText('Hello, this is a test message!')
    ).toBeInTheDocument()
  })
})
