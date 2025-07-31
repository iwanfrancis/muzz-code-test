import useMessagesStore from '@/store/messages.store'
import useUserStore from '@/store/user.store'
import type { MessageInput } from '@/types'
import { useWebSocket } from '@/hooks/useWebSocket'
import { useMemo } from 'react'

export const useChatActions = () => {
  const { sendMessage: sendMessageSocket, isConnected } = useWebSocket()

  const sendMessage = (messageInput: MessageInput) => {
    if (isConnected) {
      // Send via WebSocket
      sendMessageSocket(messageInput)
    } else {
      throw new Error('WebSocket is not connected')
    }
  }

  return {
    sendMessage,
    isConnected,
  }
}

export const useChatData = () => {
  const allMessages = useMessagesStore((state) => state.messages)
  const currentUser = useUserStore((state) => state.currentUser)
  const currentRecipient = useUserStore((state) => state.currentRecipient)

  // Filter messages to only show conversation between current user and current recipient
  // Using useMemo for performance optimization to avoid filtering on every render
  const messages = useMemo(() => {
    if (!currentRecipient) return []

    return allMessages.filter(
      (message) =>
        (message.senderId === currentUser.id &&
          message.recipientId === currentRecipient.id) ||
        (message.senderId === currentRecipient.id &&
          message.recipientId === currentUser.id)
    )
  }, [allMessages, currentUser.id, currentRecipient])

  return {
    messages,
    currentUser,
    currentRecipient,
  }
}
