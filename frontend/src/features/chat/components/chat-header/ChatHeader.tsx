import { ChevronLeft, Ellipsis } from 'lucide-react'
import UserCard from '@/components/data-display/user-card/UserCard'
import { useChatActions, useChatData } from '../../hooks/useChat'

const ChatHeader = () => {
  const { currentRecipient, currentUser } = useChatData()
  const { navigateHome } = useChatActions()

  if (!currentRecipient || !currentUser) {
    return null
  }

  return (
    <div className="flex justify-between p-5">
      <ChevronLeft onClick={navigateHome} className="cursor-pointer" />
      <UserCard user={currentRecipient} />
      {/* Doesn't need to do anything */}
      <Ellipsis className="cursor-pointer" />
    </div>
  )
}

export default ChatHeader
