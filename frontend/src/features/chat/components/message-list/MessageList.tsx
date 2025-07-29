import { useState } from 'react'
import { useChatActions, useChatData } from '../../hooks/useChat'
import MessageItem from '../message-item/MessageItem'

const MessageList = () => {
  const [currentMessage, setCurrentMessage] = useState('')
  const { messages, currentUser, currentRecipient } = useChatData()
  const { sendMessage } = useChatActions()

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
      <div className="flex-1 flex flex-col p-[5px] overflow-auto max-h-[490px]">
        <div className="mt-auto">
          {messages.map((message) => (
            <div key={message.timestamp}>
              <MessageItem message={message} key={message.id} />
            </div>
          ))}
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
