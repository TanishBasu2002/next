"use client";
import { useState, useEffect } from 'react';
import { chatApi, userApi, Chat, User } from '@/lib/api';
import Link from 'next/link';

export default function ChatsPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [chatsData, usersData] = await Promise.all([
        chatApi.getAllChats(),
        userApi.getAllUsers()
      ]);
      setChats(chatsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading chats...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">All Chats</h1>
          <Link
            href="/"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          {chats.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-xl mb-2">No chats found</p>
              <p>Start a conversation from the home page to see chats here.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {chats.map(chat => {
                const client = getUserById(chat.clientId);
                const practitioner = getUserById(chat.practitionerId);
                
                return (
                  <div key={chat.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Chat Session
                        </h3>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Client:</span>{' '}
                            {client ? `${client.name} (${client.email})` : 'Unknown'}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Practitioner:</span>{' '}
                            {practitioner ? `${practitioner.name} (${practitioner.email})` : 'Unknown'}
                          </p>
                          <p className="text-xs text-gray-500">
                            Chat ID: {chat.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {client && (
                          <Link
                            href={`/chat?userId=${client.id}&userType=client`}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                          >
                            Join as Client
                          </Link>
                        )}
                        {practitioner && (
                          <Link
                            href={`/chat?userId=${practitioner.id}&userType=admin`}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                          >
                            Join as Practitioner
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}