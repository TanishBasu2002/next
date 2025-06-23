// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';


interface MessageData {
  chatId: string;
  userId: string;
  userType: 'client' | 'admin';
  message: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  userType: string;
  message: string;
  timestamp: Date;
}

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(clientId: string, practitionerId: string) {
    try {
      const chat = await this.prisma.chats.create({
        data: {
          clientId: clientId,
          practitionerId: practitionerId,
        },
      });
      return chat;
    } catch (error) {
      // If chat already exists, return the existing one
      const existingChat = await this.prisma.chats.findFirst({
        where: {
          clientId: clientId as any,
          practitionerId: practitionerId as any,
        },
      });
      return existingChat;
    }
  }

  async saveMessage(data: MessageData): Promise<ChatMessage> {
    // Since the messages table is empty in schema, I'll create a mock structure
    // In production, you'd update the Prisma schema to include message fields
    const messageId = new Date().getTime().toString();
    const message: ChatMessage = {
      id: messageId,
      chatId: data.chatId,
      userId: data.userId,
      userType: data.userType,
      message: data.message,
      timestamp: new Date(),
    };

    // Store in memory for demo (in production, save to database)
    if (!this.messageStore[data.chatId]) {
      this.messageStore[data.chatId] = [];
    }
    this.messageStore[data.chatId].push(message);

    return message;
  }

  // In-memory storage for demo purposes
  private messageStore: { [chatId: string]: ChatMessage[] } = {};

  async getChatMessages(chatId: string): Promise<ChatMessage[]> {
    return this.messageStore[chatId] || [];
  }

  async getAllChats() {
    return await this.prisma.chats.findMany();
  }

  async getChatById(id: string) {
    return await this.prisma.chats.findUnique({
      where: { id },
    });
  }
}