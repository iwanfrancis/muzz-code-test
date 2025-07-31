import UserCard from '@/components/data-display/user-card/UserCard'
import Button from '@/components/inputs/button/Button'
import type { User } from '@/types'

interface UserListSectionProps {
  title: string
  users: User[]
  currentUserId: number
  onUserAction: (user: User) => void
  actionLabel: (user: User, isCurrentUser: boolean) => string
}

const UserListSection = ({
  title,
  users,
  currentUserId,
  onUserAction,
  actionLabel,
}: UserListSectionProps) => {
  return (
    <div className="flex-1" data-testid="user-list-section">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="flex flex-col gap-2.5">
        {users.map((user) => {
          const isCurrentUser = user.id === currentUserId
          return (
            <div className="flex items-center justify-between" key={user.id}>
              <UserCard user={user} />
              <Button
                onClick={() => onUserAction(user)}
                disabled={isCurrentUser}
              >
                {actionLabel(user, isCurrentUser)}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserListSection
