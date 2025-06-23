import { Chat, Message, User } from '@/types';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (userData: {
    email: string;
    name: string;
    role: string;
    profession?: string;
    practitionerId?: string;
  }): Promise<User> => {
    const response = await api.post('/users', userData);
    return response.data;
  },
};

export const chatApi = {
  getAllChats: async (): Promise<Chat[]> => {
    const response = await api.get('/chats');
    return response.data;
  },

  getChatById: async (id: string): Promise<Chat> => {
    const response = await api.get(`/chats/${id}`);
    return response.data;
  },

  getChatMessages: async (chatId: string): Promise<Message[]> => {
    const response = await api.get(`/chats/${chatId}/messages`);
    return response.data;
  },

  createChat: async (clientId: string, practitionerId: string): Promise<Chat> => {
    const response = await api.post('/chats', { clientId, practitionerId });
    return response.data;
  },
};
export type { User, Chat, Message };


