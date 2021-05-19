import { order, order_item } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderItemService } from './order-item.service';

@Injectable()
export class OrderService {

  constructor(
    public prisma: PrismaService,
  ) { }

  findAll(user_id: number): Promise<order[]> {
    return this.prisma.order.findMany({
      where: { user_id },
    })
  }

  findBy(where: { [key: string]: any }): Promise<order[]> {
    return this.prisma.order.findMany({ where });
  }

  findById(id: number): Promise<order> {
    return this.prisma.order.findUnique({
      where: { id },
    })
  }

  create({ items, ...orderInfo }: Omit<order, 'id'> & { items: Omit<order_item, 'id' | 'order_id'>[] }): Promise<order> {
    return this.prisma.order.create({
      data: {
        ...orderInfo,
        order_item: { createMany: { data: items } }
      }
    });
  }

  async delete(id: number): Promise<void> {
    const deleteRelations = this.prisma.order_item.deleteMany({ where: { order_id: id } });
    const deleteOrder = this.prisma.order.delete({ where: { id } });
    await this.prisma.$transaction([deleteRelations, deleteOrder]);
  }

}
