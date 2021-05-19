import { Args, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './models/category';
import { Product } from './models/product';
import { ProductsService } from './products.service';


@Resolver(() => Category)
export class CategoryResolver {
    constructor(
        private readonly productsService: ProductsService,
        private readonly categoryService: CategoryService,
    ) { }

    @Query(() => [Category])
    categories(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Query(() => Category)
    category(@Args('id') id: number): Promise<Category> {
        return this.categoryService.findById(id);
    }

    @ResolveField(() => [Product])
    products(@Parent() product: Category) {
        const { id } = product;
        return this.productsService.findBy({ id });
    }
}