import { order_item } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {

  constructor(
    public prisma: PrismaService,
  ) { }

  findAll(where: Partial<order_item> = {}): Promise<order_item[]> {
    return this.prisma.order_item.findMany({ where })
  }

  findBy(where: { [key: string]: any }): Promise<order_item[]> {
    return this.prisma.order_item.findMany({ where });
  }

  findById(id: number): Promise<order_item> {
    return this.prisma.order_item.findUnique({
      where: { id },
    })
  }

  create(data: Omit<order_item, 'id'>): Promise<order_item> {
    return this.prisma.order_item.create({
      data
    });
  }

  delete(id: number): Promise<order_item> {
    return this.prisma.order_item.delete({ where: { id } })
  }

}
