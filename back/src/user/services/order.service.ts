import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { Repository } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';
import { OrderInputData } from '../types/types';
import { CartService } from './cart.service ';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) public orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) public orderItemRepository: Repository<OrderItem>,
    private cartService: CartService
  ) { }


  getById(id: number, userId: number): Promise<Order> {
    return this.orderRepository.findOne(id, {
      where: {
        user_id: userId,
      },
      relations: ['items', 'user']
    });
  }

  getOrders(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: {
        user_id: userId,
      },
      relations: ['items', 'user']
    });
  }

  addOrder(data: OrderInputData): Promise<Order> {
    return this.orderRepository.save(data);
  }

  async createOrderFromCart(userId: number): Promise<Order> {
    const cart = await this.cartService.getCard(userId);
    if (!cart.length) {
      throw new HttpException('Cart is empty', 404);
    }

    const data = {
      user_id: userId,
      created_at: new Date().valueOf(),
      items: cart.map(i => pick(i, 'count', 'product_id'))
    }

    return this.addOrder(data);

  }


  async removeOrder(id: number, userId: number): Promise<Order> {
    const order = await this.getById(id, userId);
    if (!order) {
      return null;
    }

    if (order.items.length) {
      await this.orderItemRepository
        .delete(order.items.map(item => item.id))
    }

    return await this.orderRepository.remove(order);
  }


}
