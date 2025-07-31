import { useState } from 'react'
import { useChatActions, useChatData } from '../../hooks/useChat'

const ChatInput = () => {
  const [message, setMessage] = useState('')

  const { currentUser, currentRecipient } = useChatData()
  const { sendMessage } = useChatActions()

  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!currentRecipient || !message.trim()) return

    const newMessage = {
      senderId: currentUser.id,
      recipientId: currentRecipient.id,
      content: message.trim(),
    }

    sendMessage(newMessage)
    setMessage('')
  }

  return (
    <div className="p-5 px-[10px]">
      <form onSubmit={(e) => handleMessageSend(e)} className="flex gap-[10px]">
        <input
          type="text"
          placeholder={`Message ${currentRecipient?.name}`}
          className="flex-1 rounded-full border-[8px] border-grey px-3 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  )
}

export default ChatInput
