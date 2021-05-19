import { Args, Resolver, Query, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './models/category';
import { Product } from './models/product';
import { ProductInput } from './inputs/product.input';
import { ProductsService } from './products.service';


@Resolver(() => Product)
export class ProductsResolver {
    constructor(
        private readonly productsService: ProductsService,
        private readonly categoryService: CategoryService,
    ) { }

    @Query(() => [Product])
    products(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Query(() => Product)
    product(@Args('id') id: number): Promise<Product> {
        return this.productsService.findById(id);
    }

    @ResolveField(() => [Category])
    categories(@Parent() { id }: Product) {
        return this.categoryService.findBy({ id });
    }

    @Mutation(() => Product)
    createProduct(@Args('product') data: ProductInput): Promise<Product> {
        return this.productsService.create(data)
    }
}