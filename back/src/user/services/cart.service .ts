import { cart } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {

  constructor(
    private prisma: PrismaService
  ) { }

  findAll(): Promise<cart[]> {
    return this.prisma.cart.findMany();
  }

  findBy(where: { [key: string]: any }): Promise<cart[]> {
    return this.prisma.cart.findMany({ where });
  }
  
  findById(id: number): Promise<cart> {
    return this.prisma.cart.findUnique({
      where: {
        id
      }
    });
  }

  create(data: Omit<cart, 'id'>): Promise<cart> {
    return this.prisma.cart.create({ data });
  }

  delete(id: number): Promise<cart> {
    return this.prisma.cart.delete({ where: { id } })
  }
}
