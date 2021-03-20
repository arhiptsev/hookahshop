import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart) public cartRepository: Repository<Cart>
  ) { }


  getById(id: number): Promise<Cart> {
    return this.cartRepository.findOne(id, {
      relations: ['product']
    });
  }

  getCard(userId: number): Promise<Cart[]> {
    return this.cartRepository.find({
      where: {
        user_id: userId,
      },
      relations: ['product']
    });
  }

  addToCart(data: Omit<Cart, 'id' | 'product'>): Promise<Cart> {
    return this.cartRepository.save(data);
  }


  removeFromCart(id: number): Promise<DeleteResult> {
    return this.cartRepository.delete(id);
  }


}
