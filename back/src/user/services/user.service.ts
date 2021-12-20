import { user } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<user> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: Omit<user, 'id'>): Promise<user> {
    return await this.prisma.user.create({ data });
  }

  async findByUsername(username: string): Promise<user> {
    return await this.prisma.user.findUnique({ where: { username } });
  }
}
