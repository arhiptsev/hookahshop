import { product } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(public prisma: PrismaService) {}

  findAll(): Promise<product[]> {
    return this.prisma.product.findMany();
    this.prisma;
  }

  findBy(where: { [key: string]: any }): Promise<product[]> {
    return this.prisma.product.findMany({ where });
  }

  findById(id: number): Promise<product> {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Omit<product, 'id'>): Promise<product> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    return this.prisma.product.create({ data });
  }

  async delete(id: number): Promise<product> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    return this.prisma.product.delete({ where: { id } });
  }
}
