import type { Message } from '@/types'
import { cn } from '@/utils/cn'

interface MessageItemProps {
  currentUserId: number
  message: Message
}

const MessageItem = ({ currentUserId, message }: MessageItemProps) => {
  console.log('MessageItem rendered:', message)
  return (
    <div
      className={cn('rounded-lg px-[10px] py-1 text-sm m-2', {
        'self-end bg-pink w-auto text-white rounded-br-none':
          message.senderId === currentUserId,
        'self-start bg-grey rounded-bl-none':
          message.senderId !== currentUserId,
      })}
    >
      {message.content}
    </div>
  )
}

export default MessageItem
