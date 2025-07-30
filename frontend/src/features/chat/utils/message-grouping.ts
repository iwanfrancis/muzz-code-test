import { MESSAGE_GROUPING_TIME_SECONDS } from '@/config/chats'
import type { Message } from '@/types'
import { differenceInSeconds } from 'date-fns'

export const isGroupedWithPreviousMessage = (
  message: Message,
  previousMessage?: Message | null
) => {
  if (!previousMessage) return false

  const messageDate = new Date(message.timestamp)
  const previousMessageDate = new Date(previousMessage.timestamp)

  return (
    previousMessage.senderId === message.senderId &&
    differenceInSeconds(messageDate, previousMessageDate) <=
      MESSAGE_GROUPING_TIME_SECONDS
  )
}

export const isGroupedWithNextMessage = (
  message: Message,
  nextMessage: Message | null
) => {
  if (!nextMessage) return false

  const messageDate = new Date(message.timestamp)
  const nextMessageDate = new Date(nextMessage.timestamp)

  return (
    nextMessage.senderId === message.senderId &&
    differenceInSeconds(nextMessageDate, messageDate) <=
      MESSAGE_GROUPING_TIME_SECONDS
  )
}
