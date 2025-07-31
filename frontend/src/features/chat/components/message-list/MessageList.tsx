import { Fragment, useEffect, useRef } from 'react'
import { useChatData } from '../../hooks/useChat'
import MessageItem from '../message-item/MessageItem'
import { differenceInMinutes } from 'date-fns'
import type { Message } from '@/types'
import ChatTimestamp from '../chat-timestamp/ChatTimestamp'
import { TIME_BEFORE_CHAT_TIMESTAMP_MINUTES } from '@/config/chats'
import { useNavigate } from 'react-router'
import { paths } from '@/config/paths'
import ChatInput from '../chat-input/ChatInput'

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
  const { messages, currentUser, currentRecipient } = useChatData()
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Redirect to home if no recipient is selected
  useEffect(() => {
    if (!currentRecipient) {
      navigate(paths.home.getHref())
    }
  }, [currentRecipient, navigate])

  if (!currentRecipient) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-[5px] flex-col" ref={scrollRef}>
        <div className="mt-auto flex flex-col">
          {messages.map((message, index) => {
            const previousMessage = index > 0 ? messages[index - 1] : null
            const nextMessage =
              index < messages.length - 1 ? messages[index + 1] : null
            const showTimestamp = shouldShowTimestamp(message, previousMessage)

            return (
              <Fragment key={message.id}>
                {showTimestamp && (
                  <ChatTimestamp
                    timestamp={message.timestamp}
                    key={message.timestamp}
                  />
                )}
                <MessageItem
                  key={message.id}
                  currentUserId={currentUser.id}
                  message={message}
                  prevMessage={previousMessage}
                  nextMessage={nextMessage}
                />
              </Fragment>
            )
          })}
        </div>
      </div>
      <ChatInput />
    </div>
  )
}

export default MessageList
