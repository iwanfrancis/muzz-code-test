// Core entity types used across multiple features
export interface User {
  id: number
  name: string
  profile: string
}

export interface Message {
  id: number
  senderId: number
  recipientId: number
  content: string
  timestamp: string
}

export interface MessageInput {
  senderId: number
  recipientId: number
  content: string
}

// Common utility types
export type Page = 'home' | 'chat'
