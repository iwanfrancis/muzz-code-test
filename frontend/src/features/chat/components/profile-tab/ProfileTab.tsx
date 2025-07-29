import UserCard from '@/components/data-display/user-card/UserCard'
import { useChatData } from '../../hooks/useChat'

const ProfileTab = () => {
  const { currentRecipient } = useChatData()

  return (
    <div className="text-center py-7 flex flex-col gap-4">
      {currentRecipient && <UserCard user={currentRecipient} />}
      <p>This tab is a placeholder - no improvements are needed.</p>
    </div>
  )
}

export default ProfileTab
