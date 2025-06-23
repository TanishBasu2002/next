// src/chat/chat.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatMessage, ChatService } from './chat.service';

@Controller('api/chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  async getAllChats() {
    return await this.chatService.getAllChats();
  }

  @Get(':id')
  async getChatById(@Param('id') id: string) {
    return await this.chatService.getChatById(id);
  }

  @Get(':id/messages')
  async getChatMessages(@Param('id') chatId: string): Promise<ChatMessage[]> {
    return await this.chatService.getChatMessages(chatId);
  }

  @Post()
  async createChat(@Body() body: { clientId: string; practitionerId: string }) {
    return await this.chatService.createChat(body.clientId, body.practitionerId);
  }
}