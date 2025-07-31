import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import { sampleMessages } from "./sample-message";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite default port
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Types
interface User {
  id: number;
  name: string;
  profile: string;
  socketId: string;
}

interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  content: string;
  timestamp: string;
}

interface MessageInput {
  senderId: number;
  recipientId: number;
  content: string;
}

// In-memory storage (in production, use a database)
const connectedUsers = new Map<number, User>();
const messages: Message[] = [...sampleMessages];
let messageIdCounter = sampleMessages.length + 1; // Start from the next ID after sample messages

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle user joining
  socket.on("user:join", (user: Omit<User, "socketId">) => {
    const userWithSocket: User = {
      ...user,
      socketId: socket.id,
    };

    connectedUsers.set(user.id, userWithSocket);
    console.log(`User ${user.name} (ID: ${user.id}) joined`);

    // Broadcast updated user list to all clients
    io.emit("users:updated", Array.from(connectedUsers.values()));

    // Send user's message history (messages they sent or received)
    const userMessages = messages.filter(
      (msg) => msg.senderId === user.id || msg.recipientId === user.id
    );
    socket.emit("messages:history", userMessages);
  });

  // Handle sending messages
  socket.on("message:send", (messageInput: MessageInput) => {
    const newMessage: Message = {
      id: messageIdCounter++,
      senderId: messageInput.senderId,
      recipientId: messageInput.recipientId,
      content: messageInput.content,
      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);

    // Send message to sender (confirmation)
    socket.emit("message:received", newMessage);

    // Send message to recipient if they're online
    const recipient = connectedUsers.get(messageInput.recipientId);
    if (recipient) {
      socket.to(recipient.socketId).emit("message:received", newMessage);
    }

    console.log(
      `Message from ${messageInput.senderId} to ${messageInput.recipientId}: ${messageInput.content}`
    );
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // Remove user from connected users
    for (const [userId, user] of connectedUsers.entries()) {
      if (user.socketId === socket.id) {
        connectedUsers.delete(userId);
        console.log(`User ${user.name} (ID: ${userId}) left`);
        break;
      }
    }

    // Broadcast updated user list
    io.emit("users:updated", Array.from(connectedUsers.values()));
  });
});

// Start the server on port 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
