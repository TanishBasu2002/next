import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.users.findMany();
  }

  async getUserById(id: string) {
    return await this.prisma.users.findUnique({
      where: { id },
    });
  }

  async createUser(userData: {
    email: string;
    name: string;
    role: string;
    profession?: string;
    practitionerId?: string;
  }) {
    try {
      // Explicitly avoid transactions by using a simple create operation
      const user = await this.prisma.users.create({
        data: {
          email: userData.email,
          name: userData.name,
          role: userData.role,
          profession: userData.profession || null,
          practitionerId: userData.practitionerId || null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true,
          is_email_verified: false, // Set to false initially, verify via OTP
        },
      });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: string, userData: Partial<{
    email: string;
    name: string;
    role: string;
    profession: string;
    practitionerId: string;
    is_active: boolean;
    is_email_verified: boolean;
  }>) {
    return await this.prisma.users.update({
      where: { id },
      data: {
        ...userData,
        updated_at: new Date(),
      },
    });
  }

  async deleteUser(id: string) {
    return await this.prisma.users.delete({
      where: { id },
    });
  }

  async getUserByEmail(email: string) {
    return await this.prisma.users.findUnique({
      where: { email },
    });
  }
}

import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Post()
  async createUser(@Body() userData: {
    email: string;
    name: string;
    role: string;
    profession?: string;
    practitionerId?: string;
  }) {
    return await this.usersService.createUser(userData);
  }
}
