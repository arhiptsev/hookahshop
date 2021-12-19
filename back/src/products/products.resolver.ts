import {
  Args,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Subscription,
  ID,
  Int,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CategoryService } from './category.service';
import { Category } from './models/category';
import { Product } from './models/product';
import { ProductInput } from './inputs/product.input';
import { ProductsService } from './products.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/guards/auth.guard';

const pubSub = new PubSub();

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => [Product])
  products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Subscription(() => [Product])
  productsUpdated() {
    return pubSub.asyncIterator('productsUpdated');
  }

  @Query(() => Product)
  product(@Args('id') id: number): Promise<Product> {
    return this.productsService.findById(id);
  }

  @ResolveField(() => [Category])
  categories(@Parent() { id }: Product) {
    return this.categoryService.findBy({ id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  async createProduct(
    @Args('payload') payload: ProductInput,
  ): Promise<Product> {
    const product = await this.productsService.create(payload);
    this.emitUpdateProducts();

    return product;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  async deleteProduct(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Product> {
    const product = await this.productsService.delete(id);
    this.emitUpdateProducts();

    return product;
  }

  private async emitUpdateProducts(): Promise<void> {
    const products = await this.productsService.findAll();
    pubSub.publish('productsUpdated', { productsUpdated: products });
  }
}
