import { hash } from 'bcryptjs';
import prisma from '../lib/db';
import { User } from '@prisma/client';

export type CreateUserInput = {
  email: string;
  name: string;
  password: string;
};

export type UpdateUserInput = Partial<CreateUserInput>;

export const userService = {
  async create(data: CreateUserInput): Promise<User> {
    const hashedPassword = await hash(data.password, 10);
    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  },

  async findAll(): Promise<User[]> {
    return prisma.user.findMany({
      include: {
        products: true,
      },
    });
  },

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async update(id: number, data: UpdateUserInput): Promise<User> {
    const updateData: any = { ...data };
    if (data.password) {
      updateData.password = await hash(data.password, 10);
    }
    
    return prisma.user.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  },
}; 