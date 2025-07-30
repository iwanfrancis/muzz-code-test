import { paths } from '@/config/paths'
import useUserStore from '@/store/user.store'
import type { User } from '@/types'
import { useNavigate } from 'react-router'

export const useUserActions = () => {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)
  const setCurrentRecipient = useUserStore((state) => state.setCurrentRecipient)
  const navigate = useNavigate()

  const switchUser = (user: User) => {
    setCurrentUser(user)
    setCurrentRecipient(null)
  }

  const messageUser = (user: User) => {
    setCurrentRecipient(user)
    navigate(paths.chat.getHref())
  }

  return {
    switchUser,
    messageUser,
  }
}
