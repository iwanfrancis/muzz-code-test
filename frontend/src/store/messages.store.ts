import type { Message, MessageInput } from '@/types'
import { create } from 'zustand'

type MessagesState = {
  messages: Message[]
  createMessage: (message: MessageInput) => void
  addMessage: (message: Message) => void
  setMessages: (messages: Message[]) => void
}

const useMessagesStore = create<MessagesState>()((set) => ({
  messages: [],
  createMessage: (message: MessageInput) =>
    set((state) => {
      const newMessage: Message = {
        id: state.messages.length + 1,
        senderId: message.senderId,
        recipientId: message.recipientId,
        content: message.content,
        timestamp: new Date().toISOString(),
      }
      return { messages: [...state.messages, newMessage] }
    }),
  addMessage: (message: Message) =>
    set((state) => {
      // Check if message already exists to prevent duplicates
      const existingMessage = state.messages.find((m) => m.id === message.id)
      if (existingMessage) {
        return state // Don't add duplicate
      }
      return { messages: [...state.messages, message] }
    }),
  setMessages: (messages: Message[]) => set({ messages }),
}))

export default useMessagesStore
