import { paths } from '@/config/paths'
import useMessagesStore from '@/store/messages.store'
import useUserStore from '@/store/user.store'
import type { MessageInput } from '@/types'
import { useNavigate } from 'react-router'
import { useWebSocket } from '@/hooks/useWebSocket'

export const useChatActions = () => {
  const navigate = useNavigate()
  const { sendMessage: sendMessageSocket, isConnected } = useWebSocket()

  const sendMessage = (messageInput: MessageInput) => {
    if (isConnected) {
      // Send via WebSocket
      sendMessageSocket(messageInput)
    } else {
      throw new Error('WebSocket is not connected')
    }
  }

  const navigateHome = () => {
    navigate(paths.home.getHref())
  }

  return {
    sendMessage,
    navigateHome,
    isConnected,
  }
}

export const useChatData = () => {
  const messages = useMessagesStore((state) => state.messages)
  const currentUser = useUserStore((state) => state.currentUser)
  const currentRecipient = useUserStore((state) => state.currentRecipient)

  return {
    messages,
    currentUser,
    currentRecipient,
  }
}
