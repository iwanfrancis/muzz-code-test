import { ChevronLeft, Ellipsis } from 'lucide-react'
import UserCard from '@/components/data-display/user-card/UserCard'
import { useChatData } from '../../hooks/useChat'
import { Link } from 'react-router'
import { paths } from '@/config/paths'

const ChatHeader = () => {
  const { currentRecipient, currentUser } = useChatData()
  if (!currentRecipient || !currentUser) {
    return null
  }

  return (
    <div className="flex justify-between p-5">
      <Link
        to={paths.home.getHref()}
        className="flex items-center"
        aria-label="Back to home"
      >
        <ChevronLeft className="cursor-pointer" />
      </Link>
      <UserCard user={currentRecipient} />
      {/* Doesn't need to do anything */}
      <Ellipsis className="cursor-pointer" />
    </div>
  )
}

export default ChatHeader
