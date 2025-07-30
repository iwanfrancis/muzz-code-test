import { describe, it, expect } from 'vitest'
import { addSeconds } from 'date-fns'
import {
  isGroupedWithPreviousMessage,
  isGroupedWithNextMessage,
} from './message-grouping'
import { MESSAGE_GROUPING_TIME_SECONDS } from '@/config/chats'
import type { Message } from '@/types'

describe('message-grouping utils', () => {
  const baseDate = new Date('2025-07-30T10:00:00Z')

  const createMessage = (overrides: Partial<Message> = {}): Message => ({
    id: 1,
    senderId: 100,
    recipientId: 200,
    content: 'Test message',
    timestamp: baseDate.toISOString(),
    ...overrides,
  })

  describe('isGroupedWithPreviousMessage', () => {
    it('returns false when there is no previous message', () => {
      const message = createMessage()

      expect(isGroupedWithPreviousMessage(message, null)).toBe(false)
      expect(isGroupedWithPreviousMessage(message, undefined)).toBe(false)
    })

    it('returns false when messages are from different senders', () => {
      const previousMessage = createMessage({ senderId: 100 })
      const message = createMessage({ senderId: 101 })

      expect(isGroupedWithPreviousMessage(message, previousMessage)).toBe(false)
    })

    it('returns false when messages are from the same sender but time difference exceeds grouping threshold', () => {
      const previousMessage = createMessage({
        senderId: 100,
        timestamp: baseDate.toISOString(),
      })
      const message = createMessage({
        senderId: 100,
        timestamp: addSeconds(
          baseDate,
          MESSAGE_GROUPING_TIME_SECONDS + 1
        ).toISOString(),
      })

      expect(isGroupedWithPreviousMessage(message, previousMessage)).toBe(false)
    })

    it('returns true when messages are from the same sender and within grouping time threshold', () => {
      const previousMessage = createMessage({
        senderId: 100,
        timestamp: baseDate.toISOString(),
      })
      const message = createMessage({
        senderId: 100,
        timestamp: addSeconds(
          baseDate,
          MESSAGE_GROUPING_TIME_SECONDS
        ).toISOString(),
      })

      expect(isGroupedWithPreviousMessage(message, previousMessage)).toBe(true)
    })

    it('returns true when messages are from the same sender and sent within 1 second', () => {
      const previousMessage = createMessage({
        senderId: 100,
        timestamp: baseDate.toISOString(),
      })
      const message = createMessage({
        senderId: 100,
        timestamp: addSeconds(baseDate, 1).toISOString(),
      })

      expect(isGroupedWithPreviousMessage(message, previousMessage)).toBe(true)
    })

    it('handles different timestamp formats', () => {
      const previousMessage = createMessage({
        senderId: 100,
        timestamp: '2025-07-30T10:00:00.000Z',
      })
      const message = createMessage({
        senderId: 100,
        timestamp: '2025-07-30T10:00:10.000Z',
      })

      expect(isGroupedWithPreviousMessage(message, previousMessage)).toBe(true)
    })
  })

  describe('isGroupedWithNextMessage', () => {
    it('returns false when there is no next message', () => {
      const message = createMessage()

      expect(isGroupedWithNextMessage(message, null)).toBe(false)
    })

    it('returns false when messages are from different senders', () => {
      const message = createMessage({ senderId: 100 })
      const nextMessage = createMessage({ senderId: 101 })

      expect(isGroupedWithNextMessage(message, nextMessage)).toBe(false)
    })

    it('returns false when messages are from the same sender but time difference exceeds grouping threshold', () => {
      const message = createMessage({
        senderId: 100,
        timestamp: baseDate.toISOString(),
      })
      const nextMessage = createMessage({
        senderId: 100,
        timestamp: addSeconds(
          baseDate,
          MESSAGE_GROUPING_TIME_SECONDS + 1
        ).toISOString(),
      })

      expect(isGroupedWithNextMessage(message, nextMessage)).toBe(false)
    })

    it('returns true when messages are from the same sender and within grouping time threshold', () => {
      const message = createMessage({
        senderId: 100,
        timestamp: baseDate.toISOString(),
      })
      const nextMessage = createMessage({
        senderId: 100,
        timestamp: addSeconds(
          baseDate,
          MESSAGE_GROUPING_TIME_SECONDS
        ).toISOString(),
      })

      expect(isGroupedWithNextMessage(message, nextMessage)).toBe(true)
    })

    it('returns true when messages are from the same sender and sent within 1 second', () => {
      const message = createMessage({
        senderId: 100,
        timestamp: baseDate.toISOString(),
      })
      const nextMessage = createMessage({
        senderId: 100,
        timestamp: addSeconds(baseDate, 1).toISOString(),
      })

      expect(isGroupedWithNextMessage(message, nextMessage)).toBe(true)
    })

    it('handles different timestamp formats', () => {
      const message = createMessage({
        senderId: 100,
        timestamp: '2025-07-30T10:00:00.000Z',
      })
      const nextMessage = createMessage({
        senderId: 100,
        timestamp: '2025-07-30T10:00:15.000Z',
      })

      expect(isGroupedWithNextMessage(message, nextMessage)).toBe(true)
    })
  })
})
