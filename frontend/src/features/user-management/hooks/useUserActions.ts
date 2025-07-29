import usePageStore from '@/store/page.store'
import useUserStore from '@/store/user.store'
import type { User } from '@/types'

export const useUserActions = () => {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)
  const setCurrentRecipient = useUserStore((state) => state.setCurrentRecipient)
  const setCurrentPage = usePageStore((state) => state.setCurrentPage)

  const switchUser = (user: User) => {
    setCurrentUser(user)
    setCurrentRecipient(null)
  }

  const messageUser = (user: User) => {
    setCurrentRecipient(user)
    setCurrentPage('chat')
  }

  return {
    switchUser,
    messageUser,
  }
}
