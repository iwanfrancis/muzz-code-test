import type { Message } from '@/store/messages.store.ts'

type MessageProps = {
  message: Message
}

const MessageItem = ({ message }: MessageProps) => {
  return (
    <div className="rounded-lg px-[10px] py-1 text-sm bg-amber-50 m-2">
      {message.content}
    </div>
  )
}

export default MessageItem
