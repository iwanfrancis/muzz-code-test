import Chat from '@/pages/chat/Chat.tsx'
import Home from '@/pages/home/Home.tsx'
import Container from '@/components/layout/container/Container'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './App.css'
import usePageStore from './store/page.store'

const queryClient = new QueryClient()

function App() {
  const page = usePageStore((state) => state.currentPage)

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        {page === 'home' && <Home />}
        {page === 'chat' && <Chat />}
      </Container>
    </QueryClientProvider>
  )
}

export default App
