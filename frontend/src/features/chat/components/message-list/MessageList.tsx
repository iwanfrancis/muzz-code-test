import { useState, useEffect, useRef } from 'react'
import { useChatActions, useChatData } from '../../hooks/useChat'
import MessageItem from '../message-item/MessageItem'
import { differenceInMinutes } from 'date-fns'
import type { Message } from '@/types'
import ChatTimestamp from '../chat-timestamp/ChatTimestamp'
import { TIME_BEFORE_CHAT_TIMESTAMP_MINUTES } from '@/config/chats'

const shouldShowTimestamp = (
  message: Message,
  previousMessage: Message | null
) => {
  if (!previousMessage) return true // First message always shows timestamp

  const messageDate = new Date(message.timestamp)
  const previousMessageDate = new Date(previousMessage.timestamp)

  return (
    differenceInMinutes(messageDate, previousMessageDate) >=
    TIME_BEFORE_CHAT_TIMESTAMP_MINUTES
  )
}

const MessageList = () => {
  const [currentMessage, setCurrentMessage] = useState('')
  const { messages, currentUser, currentRecipient } = useChatData()
  const { sendMessage } = useChatActions()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!currentRecipient || !currentMessage.trim()) return

    const newMessage = {
      senderId: currentUser.id,
      recipientId: currentRecipient.id,
      content: currentMessage.trim(),
    }

    sendMessage(newMessage)
    setCurrentMessage('')
  }

  if (!currentRecipient) {
    return <div>No recipient selected</div>
  }

  return (
    <div className="flex-1 flex flex-col">
      <div
        className="flex-1 overflow-auto p-[5px] flex-col max-h-[490px]"
        ref={scrollRef}
      >
        <div className="mt-auto flex flex-col">
          {messages.map((message, index) => {
            const previousMessage = index > 0 ? messages[index - 1] : null
            const nextMessage =
              index < messages.length - 1 ? messages[index + 1] : null
            const showTimestamp = shouldShowTimestamp(message, previousMessage)

            return (
              <>
                {showTimestamp && (
                  <ChatTimestamp timestamp={message.timestamp} />
                )}
                <MessageItem
                  currentUserId={currentUser.id}
                  message={message}
                  prevMessage={previousMessage}
                  nextMessage={nextMessage}
                />
              </>
            )
          })}
        </div>
      </div>
      <div className="p-5 px-[10px]">
        <form
          onSubmit={(e) => handleMessageSend(e)}
          className="flex gap-[10px]"
        >
          <input
            type="text"
            placeholder={`Message ${currentRecipient.name}`}
            className="flex-1 rounded-full border-[8px] border-grey px-3 py-2"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default MessageList
