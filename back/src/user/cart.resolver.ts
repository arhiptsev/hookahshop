
import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Product } from 'src/products/models/product';
import { ProductsService } from 'src/products/products.service';
import { GqlAuthGuard } from './guards/auth.guard';
import { Cart } from './models/cart';
import { CartService } from './services/cart.service ';
import { CurrentUser } from './utils/current-user';

@Resolver(() => Cart)
export class CartResolver {
    constructor(
        private readonly cartService: CartService,
        private readonly productsService: ProductsService,
    ) { }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Cart)
    addToCart(@Args('productId') pId: number, @CurrentUser() user): Promise<Cart> {
        console.log(4534)

        return this.cartService.create({
            user_id: user.userId,
            product_id: pId,
            count: 1
        });
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Cart])
    cart(@CurrentUser() { userId: user_id }): Promise<Cart[]> {
        return this.cartService.findBy({ user_id });
    }

    @ResolveField(() => Product)
    product(@Parent() { product_id: id }: Cart) {
        return this.productsService.findById(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Cart)
    async removeFromCart(@Args('id') id: number): Promise<Cart> {
        return this.cartService.delete(id);
    }

}