import useMessagesStore from '@/store/messages.store'
import usePageStore from '@/store/page.store'
import useUserStore from '@/store/user.store'
import type { MessageInput } from '@/types'

export const useChatActions = () => {
  const createMessage = useMessagesStore((state) => state.createMessage)
  const setCurrentPage = usePageStore((state) => state.setCurrentPage)

  const sendMessage = (messageInput: MessageInput) => {
    createMessage(messageInput)
  }

  const navigateHome = () => {
    setCurrentPage('home')
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
