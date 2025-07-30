import { useEffect, useRef, useCallback } from 'react'
import socketService from '@/lib/socket-service'
import useMessagesStore from '@/store/messages.store'
import useUserStore from '@/store/user.store'
import type { Message, User } from '@/types'

export const useWebSocket = () => {
  const currentUser = useUserStore((state) => state.currentUser)
  const isConnectedRef = useRef(false)
  const eventListenersSetRef = useRef(false)

  // Use useCallback to prevent re-running effect when store functions change
  const handleMessageReceived = useCallback((message: Message) => {
    const { addMessage } = useMessagesStore.getState()
    addMessage(message)
  }, [])

  const handleMessagesHistory = useCallback((messages: Message[]) => {
    const { setMessages } = useMessagesStore.getState()
    setMessages(messages)
  }, [])

  const handleUsersUpdated = useCallback((users: User[]) => {
    console.log('Connected users:', users)
  }, [])

  const handleUserTyping = useCallback(
    (data: { userId: number; isTyping: boolean }) => {
      console.log('User typing:', data)
    },
    []
  )

  useEffect(() => {
    const connectToServer = async () => {
      try {
        if (!isConnectedRef.current) {
          await socketService.connect()
          isConnectedRef.current = true

          // Join the user to the server
          socketService.joinUser(currentUser)
        }

        // Set up event listeners only once
        if (!eventListenersSetRef.current) {
          socketService.onMessageReceived(handleMessageReceived)
          socketService.onMessagesHistory(handleMessagesHistory)
          socketService.onUsersUpdated(handleUsersUpdated)
          eventListenersSetRef.current = true
        }
      } catch (error) {
        console.error('Failed to connect to WebSocket server:', error)
      }
    }

    connectToServer()

    // Cleanup on unmount
    return () => {
      if (eventListenersSetRef.current) {
        socketService.offMessageReceived()
        socketService.offMessagesHistory()
        socketService.offUsersUpdated()
        eventListenersSetRef.current = false
      }
      socketService.disconnect()
      isConnectedRef.current = false
    }
  }, [
    currentUser,
    handleMessageReceived,
    handleMessagesHistory,
    handleUsersUpdated,
    handleUserTyping,
  ])

  return {
    isConnected: socketService.isConnected(),
    sendMessage: socketService.sendMessage.bind(socketService),
  }
}
