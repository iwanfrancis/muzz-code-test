import { useQuery } from '@tanstack/react-query'
import type { User } from '@/types'

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/user/all.json')
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}
