"use client";
import { useState, useEffect } from 'react';
import { User, userApi } from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await userApi.getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const clients = users.filter(user => user.role === 'client');
  const practitioners = users.filter(user => user.role === 'practitioner');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Chat Application
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Clients Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Clients</h2>
            <div className="space-y-3">
              {clients.map(client => (
                <div key={client.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.email}</p>
                    </div>
                    <Link
                      href={`/chat?userId=${client.id}&userType=client`}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Start Chat
                    </Link>
                  </div>
                </div>
              ))}
              {clients.length === 0 && (
                <p className="text-gray-500 text-center py-4">No clients found</p>
              )}
            </div>
          </div>

          {/* Practitioners Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Practitioners</h2>
            <div className="space-y-3">
              {practitioners.map(practitioner => (
                <div key={practitioner.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{practitioner.name}</h3>
                      <p className="text-sm text-gray-600">{practitioner.email}</p>
                      {practitioner.profession && (
                        <p className="text-sm text-gray-500">{practitioner.profession}</p>
                      )}
                    </div>
                    <Link
                      href={`/chat?userId=${practitioner.id}&userType=admin`}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                      Start Chat
                    </Link>
                  </div>
                </div>
              ))}
              {practitioners.length === 0 && (
                <p className="text-gray-500 text-center py-4">No practitioners found</p>
              )}
            </div>
          </div>
        </div>

        {/* Create User Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Quick Actions</h2>
          <div className="flex gap-4">
            <Link
              href="/create-user"
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Create New User
            </Link>
            <Link
              href="/chats"
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              View All Chats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}