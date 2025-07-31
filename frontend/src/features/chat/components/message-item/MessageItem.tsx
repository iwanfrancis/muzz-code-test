import type { Message } from '@/types'
import { cn } from '@/utils/cn'

interface MessageItemProps {
  currentUserId: number
  message: Message
  isGrouped?: boolean
}

const MessageItem = ({
  currentUserId,
  message,
  isGrouped = false,
}: MessageItemProps) => {
  const belongsToCurrentUser = message.senderId === currentUserId

  return (
    <span
      data-testid="message-item"
      className={cn(
        'rounded-xl px-[10px] p-2 text-sm leading-tight mx-2 min-w-8 max-w-64',
        {
          'self-end bg-pink w-auto text-white': belongsToCurrentUser,
          'self-start bg-grey': !belongsToCurrentUser,
          'rounded-br-none': belongsToCurrentUser && !isGrouped,
          'rounded-bl-none': !belongsToCurrentUser && !isGrouped,
          'mb-3': !isGrouped,
          'mb-[1px]': isGrouped,
        }
      )}
    >
      {message.content}
    </span>
  )
}

export default MessageItem
