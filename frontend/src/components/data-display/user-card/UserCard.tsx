import type { User } from '@/types'

const UserCard = ({ user }: { user: User }) => {
  return (
    <div
      className="flex gap-2.5 items-center justify-center"
      data-testid="user-card"
    >
      <img
        className="w-10 h-auto rounded-full"
        src={user.profile}
        alt={user.name}
      />
      <h3 className="font-semibold">{user.name}</h3>
    </div>
  )
}

export default UserCard
