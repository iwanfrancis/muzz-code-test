import type { Message } from '@/types'
import { cn } from '@/utils/cn'
import { useMemo } from 'react'
import {
  isGroupedWithPreviousMessage,
  isGroupedWithNextMessage,
} from '../../utils/message-grouping'

interface MessageItemProps {
  currentUserId: number
  message: Message
  prevMessage: Message | null
  nextMessage: Message | null
}

const MessageItem = ({
  currentUserId,
  message,
  prevMessage,
  nextMessage,
}: MessageItemProps) => {
  const isGroupedWithPrevious = useMemo(
    () => isGroupedWithPreviousMessage(message, prevMessage),
    [message, prevMessage]
  )
  const isGroupedWithNext = useMemo(
    () => isGroupedWithNextMessage(message, nextMessage),
    [message, nextMessage]
  )

  const belongsToCurrentUser = message.senderId === currentUserId

  return (
    <span
      className={cn(
        'rounded-xl px-[10px] p-2 text-sm leading-none mx-2 min-w-8 max-w-64',
        {
          'self-end bg-pink w-auto text-white': belongsToCurrentUser,
          'self-start bg-grey': !belongsToCurrentUser,
          'rounded-br-none': belongsToCurrentUser && !isGroupedWithNext,
          'rounded-bl-none': !belongsToCurrentUser && !isGroupedWithNext,
          'mt-3': !isGroupedWithPrevious,
          'mt-[1px]': isGroupedWithPrevious,
        }
      )}
    >
      {message.content}
    </span>
  )
}

export default MessageItem
