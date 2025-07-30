import { paths } from '@/config/paths'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  }
}

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      index: true,
      path: paths.home.path,
      lazy: () => import('./routes/home/home').then(convert(queryClient)),
    },
    {
      path: paths.chat.path,
      lazy: () => import('./routes/chat/chat').then(convert(queryClient)),
    },
  ])

export const AppRouter = () => {
  const queryClient = useQueryClient()

  const router = useMemo(() => createAppRouter(queryClient), [queryClient])

  return <RouterProvider router={router} />
}
