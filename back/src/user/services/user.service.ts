import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) public userRepository: Repository<User>
  ) { }


  async getById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async addUser(data: Omit<User, 'id'>): Promise<User> {
    return await this.userRepository.save(data);
  }

  async getByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username: username } });
  }
}
