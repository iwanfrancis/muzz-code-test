import useUserStore from '@/store/user.store'
import { useUsers } from '../../api/get-users'
import { useUserActions } from '../../hooks/useUserActions'
import UserListSection from '../user-list-section/UserListSection'

const UserList = () => {
  const currentUser = useUserStore((state) => state.currentUser)
  const { data: users } = useUsers()
  const { switchUser, messageUser } = useUserActions()

  if (!users) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <UserListSection
        title="Select Current User"
        users={users}
        currentUserId={currentUser.id}
        onUserAction={switchUser}
        actionLabel={(_user, isCurrentUser) =>
          isCurrentUser ? 'Current User' : 'Switch to'
        }
      />

      <UserListSection
        title="Message Someone"
        users={users}
        currentUserId={currentUser.id}
        onUserAction={messageUser}
        actionLabel={() => 'Message'}
      />
    </div>
  )
}

export default UserList
