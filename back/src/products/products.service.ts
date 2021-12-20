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

  async create({
    categories = [],
    ...data
  }: Omit<product, 'id'> & { categories?: number[] }): Promise<product> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    return this.prisma.product.create({
      data: {
        ...data,
        product_category: {
          createMany: { data: categories.map(c_id => ({ c_id })) },
        },
      },
    });
  }

  async delete(id: number): Promise<product> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    return this.prisma.product.delete({ where: { id } });
  }
}
