export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  profession?: string;
  practitionerId?: string;
  is_active: boolean;
  is_email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Chat {
  id: string;
  clientId: string;
  practitionerId: string;
}

export interface Message {
  id: string;
  chatId: string;
  userId: string;
  userType: 'client' | 'admin';
  message: string;
  timestamp: Date;
}
