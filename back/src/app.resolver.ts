import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { Article } from './article.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Resolver()
export class AppResolver {
    constructor(
        private readonly service: AppService,
        @InjectRepository(Category) private readonly cat: Repository<Category>,
        @InjectRepository(Product) private readonly prod: Repository<Product>,
    ) { }


    @Query('articles')
    async getArticles(): Promise<Article[]> {
        return await this.service.getArticles();
    }

    @Query('article')
    async getArticle(@Args('id') id): Promise<Article> {
        return await this.service.getArticle(id);
    }

    @Query('products')
    async getProducts(): Promise<Product[]> {
        return await this.prod.find({ relations: ['categories'] });
    }


    @Query('product')
    async getProduct(@Args('id') id): Promise<Product> {
        return await this.prod.findOne(id, { relations: ['categories'] });
    }


    @Mutation('createProduct')
    async createProduct(@Args('product') data): Promise<Product> {

        return ((this.prod.save({ ...data }) as unknown) as Promise<Product>);
    }





}