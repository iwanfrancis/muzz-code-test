import { paths } from '@/config/paths'
import useMessagesStore from '@/store/messages.store'
import useUserStore from '@/store/user.store'
import type { MessageInput } from '@/types'
import { useNavigate } from 'react-router'

export const useChatActions = () => {
  const createMessage = useMessagesStore((state) => state.createMessage)
  const navigate = useNavigate()

  const sendMessage = (messageInput: MessageInput) => {
    createMessage(messageInput)
  }

  const navigateHome = () => {
    navigate(paths.home.getHref())
  }

  return {
    sendMessage,
    navigateHome,
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
