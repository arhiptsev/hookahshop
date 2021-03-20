import { createParamDecorator, Injectable, Param, UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation, Info, ResolveField, Parent, ResolveReference, ResolveProperty, Root, Context } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { AppService } from './app.service';
import { Article } from './article.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';
import { GqlAuthGuard } from './user/guards/auth.guard';

export const Relations = createParamDecorator(
    (names, { args }) => {
        const info = args[3];
        const fields = info.fieldNodes[0].selectionSet.selections.map(item => item.name.value);
        return fields.filter(item => names.includes(item));
    },
);

@Resolver('Category')
export class CategoryResolver {
    constructor(
        @InjectRepository(Category) private readonly cat: Repository<Category>,
        @InjectRepository(Product) private readonly prod: Repository<Product>,
    ) { }



    @Query('categories')
    async getCategories(): Promise<Category[]> {
        return await this.cat.find({ relations: ['products'] });
    }

    @Query('category')
    async getCategory(@Args('id') id, @Relations(['products']) relations): Promise<Category> {
        return await this.cat.findOne(id, { relations: relations });
    }

    // @ResolveField('products')
    // async getProductCategories(@Parent() category): Promise<Product[]> {
    //     const { id } = category;
    //     const { products } = await this.cat.findOne(id, { relations: ['products'] });
    //     return products;
    // }

}