import type { Message } from '@/types'

interface MessageItemProps {
  message: Message
}

const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div className="rounded-lg px-[10px] py-1 text-sm bg-amber-50 m-2">
      {message.content}
    </div>
  )
}

export default MessageItem
