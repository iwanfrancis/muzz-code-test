import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { useWebSocket } from '@/hooks/useWebSocket'

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize WebSocket connection
  useWebSocket()

  return <>{children}</>
}

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>{children}</WebSocketProvider>
    </QueryClientProvider>
  )
}

export default AppProvider
