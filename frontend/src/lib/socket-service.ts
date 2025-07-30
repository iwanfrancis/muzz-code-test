import { io, Socket } from 'socket.io-client'
import type { Message, MessageInput, User } from '@/types'

class SocketService {
  private socket: Socket | null = null
  private readonly SERVER_URL = 'http://localhost:3001'

  connect(): Promise<Socket> {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve(this.socket)
        return
      }

      this.socket = io(this.SERVER_URL, {
        transports: ['websocket'],
        timeout: 5000,
      })

      this.socket.on('connect', () => {
        console.log('Connected to server:', this.socket?.id)
        resolve(this.socket!)
      })

      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error)
        reject(error)
      })

      this.socket.on('disconnect', (reason) => {
        console.log('Disconnected from server:', reason)
      })
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  // User actions
  joinUser(user: User) {
    this.socket?.emit('user:join', user)
  }

  // Message actions
  sendMessage(messageInput: MessageInput) {
    this.socket?.emit('message:send', messageInput)
  }

  // Event listeners
  onMessageReceived(callback: (message: Message) => void) {
    this.socket?.on('message:received', callback)
  }

  onMessagesHistory(callback: (messages: Message[]) => void) {
    this.socket?.on('messages:history', callback)
  }

  onUsersUpdated(callback: (users: User[]) => void) {
    this.socket?.on('users:updated', callback)
  }

  onUserTyping(
    callback: (data: { userId: number; isTyping: boolean }) => void
  ) {
    this.socket?.on('user:typing', callback)
  }

  // Remove event listeners
  offMessageReceived() {
    this.socket?.off('message:received')
  }

  offMessagesHistory() {
    this.socket?.off('messages:history')
  }

  offUsersUpdated() {
    this.socket?.off('users:updated')
  }

  isConnected(): boolean {
    return this.socket?.connected || false
  }
}

// Create a singleton instance
const socketService = new SocketService()
export default socketService
