// Message type definition (matching the frontend types)
interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  content: string;
  timestamp: string;
}

// Sample messages showcasing different features:
// - Message grouping (messages sent within 20 seconds)
// - Different timestamp formats (today, yesterday, this week, older)
// - Conversations between multiple users
// - Various message lengths and content types

export const sampleMessages: Message[] = [
  // Conversation between Alisha (1) and John (2) - Yesterday
  {
    id: 1,
    senderId: 1,
    recipientId: 2,
    content: "Hey John! How was your weekend?",
    timestamp: "2025-07-30T09:15:00.000Z",
  },
  {
    id: 2,
    senderId: 2,
    recipientId: 1,
    content: "Hi Alisha! It was great, thanks for asking 😊",
    timestamp: "2025-07-30T09:16:30.000Z",
  },
  {
    id: 3,
    senderId: 2,
    recipientId: 1,
    content: "Went hiking with some friends and then had a family BBQ",
    timestamp: "2025-07-30T09:16:45.000Z", // Grouped with previous (within 20 seconds)
  },
  {
    id: 4,
    senderId: 1,
    recipientId: 2,
    content: "That sounds wonderful! I love family gatherings",
    timestamp: "2025-07-30T09:18:00.000Z",
  },
  {
    id: 5,
    senderId: 2,
    recipientId: 1,
    content: "My mum made the most amazing homemade pasta!",
    timestamp: "2025-07-30T09:20:15.000Z",
  },

  // Conversation between Alisha (1) and Maddie (3) - Earlier this week
  {
    id: 6,
    senderId: 3,
    recipientId: 1,
    content: "Hey! Still up for meeting this week?",
    timestamp: "2025-07-28T14:30:00.000Z",
  },
  {
    id: 7,
    senderId: 1,
    recipientId: 3,
    content: "Absolutely! Been looking forward to it",
    timestamp: "2025-07-28T14:32:00.000Z",
  },
  {
    id: 8,
    senderId: 1,
    recipientId: 3,
    content: "Would you like to meet somewhere public? Maybe a nice cafe?",
    timestamp: "2025-07-28T14:32:10.000Z", // Grouped with previous
  },
  {
    id: 9,
    senderId: 3,
    recipientId: 1,
    content: "Perfect! There's a lovely place in Camden - The Coffee House?",
    timestamp: "2025-07-28T14:35:00.000Z",
  },

  // Conversation between John (2) and Maddie (3) - Last week
  {
    id: 10,
    senderId: 2,
    recipientId: 3,
    content: "Hey Maddie, how did your job interview go?",
    timestamp: "2025-07-23T16:45:00.000Z",
  },
  {
    id: 11,
    senderId: 3,
    recipientId: 2,
    content: "Really well! I think I nailed it",
    timestamp: "2025-07-23T16:47:30.000Z",
  },
  {
    id: 12,
    senderId: 3,
    recipientId: 2,
    content: "Thanks for helping me practice the interview questions",
    timestamp: "2025-07-23T16:47:45.000Z", // Grouped with previous
  },
  {
    id: 13,
    senderId: 2,
    recipientId: 3,
    content: "No problem! You were well prepared 🚀",
    timestamp: "2025-07-23T16:50:00.000Z",
  },

  // More recent conversation between Alisha (1) and John (2) - Early this morning
  {
    id: 14,
    senderId: 1,
    recipientId: 2,
    content: "Good morning! How are you feeling about today?",
    timestamp: "2025-07-31T06:00:00.000Z",
  },
  {
    id: 15,
    senderId: 2,
    recipientId: 1,
    content: "Morning! A bit nervous but I think I'm ready",
    timestamp: "2025-07-31T06:02:00.000Z",
  },
  {
    id: 16,
    senderId: 1,
    recipientId: 2,
    content: "You'll do amazing! 💪",
    timestamp: "2025-07-31T06:02:30.000Z",
  },
  {
    id: 17,
    senderId: 1,
    recipientId: 2,
    content: "I'll be thinking of you today",
    timestamp: "2025-07-31T06:02:35.000Z", // Grouped with previous
  },

  // Recent conversation between Alisha (1) and Maddie (3) - This morning
  {
    id: 18,
    senderId: 3,
    recipientId: 1,
    content:
      "That coffee date yesterday was amazing! We should definitely do it again",
    timestamp: "2025-07-31T07:30:00.000Z",
  },
  {
    id: 19,
    senderId: 1,
    recipientId: 3,
    content: "I had such a great time! You're so easy to talk to",
    timestamp: "2025-07-31T07:32:00.000Z",
  },
  {
    id: 20,
    senderId: 1,
    recipientId: 3,
    content: "I really enjoyed hearing about your travel stories",
    timestamp: "2025-07-31T07:32:15.000Z", // Grouped with previous
  },
  {
    id: 21,
    senderId: 3,
    recipientId: 1,
    content: "Maybe next time we could try that new restaurant you mentioned?",
    timestamp: "2025-07-31T07:35:00.000Z",
  },

  // Short conversation between John (2) and Maddie (3) - This morning
  {
    id: 22,
    senderId: 2,
    recipientId: 3,
    content: "Hey, any update on the job application?",
    timestamp: "2025-07-31T06:15:00.000Z",
  },
  {
    id: 23,
    senderId: 3,
    recipientId: 2,
    content: "Yes! They offered me the position!",
    timestamp: "2025-07-31T06:16:00.000Z",
  },
  {
    id: 24,
    senderId: 3,
    recipientId: 2,
    content: "I start next Monday 🎉",
    timestamp: "2025-07-31T06:16:10.000Z", // Grouped with previous
  },

  // Recent messages - a couple hours ago
  {
    id: 25,
    senderId: 1,
    recipientId: 2,
    content: "How did your presentation go?!",
    timestamp: "2025-07-31T08:00:00.000Z",
  },
  {
    id: 26,
    senderId: 2,
    recipientId: 1,
    content: "It went amazing! 🎉",
    timestamp: "2025-07-31T08:01:00.000Z",
  },
  {
    id: 27,
    senderId: 2,
    recipientId: 1,
    content: "The team loved our proposal",
    timestamp: "2025-07-31T08:01:15.000Z", // Grouped with previous
  },
  {
    id: 28,
    senderId: 2,
    recipientId: 1,
    content: "They want to move forward with the project!",
    timestamp: "2025-07-31T08:01:18.000Z", // Grouped with previous
  },
  {
    id: 29,
    senderId: 1,
    recipientId: 2,
    content: "That's incredible news! I'm so proud of you! 🌟",
    timestamp: "2025-07-31T08:02:30.000Z",
  },
  {
    id: 30,
    senderId: 1,
    recipientId: 2,
    content: "We should celebrate! Dinner this weekend?",
    timestamp: "2025-07-31T08:02:45.000Z", // Grouped with previous
  },
];
