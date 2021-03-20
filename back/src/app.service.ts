import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Article) public article: Repository<Article>
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getArticles(): Promise<Article[]> {
    return await this.article.find();
  }

  async getArticle(id: number): Promise<Article> {
    return await this.article.findOne(id);
  }
}
