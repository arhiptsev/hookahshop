
import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Mutation, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';
import { pick } from 'lodash';
import { GqlAuthGuard } from './guards/auth.guard';
import { Cart } from './models/cart';
import { Order } from './models/order';
import { OrderItem } from './models/order-item';
import { CartService } from './services/cart.service ';
import { OrderItemService } from './services/order-item.service';
import { OrderService } from './services/order.service';
import { CurrentUser } from './utils/current-user';

@Resolver(() => Order)
export class OrderResolver {
    constructor(
        private readonly cartService: CartService,
        private readonly orderService: OrderService,
        private readonly orderItemService: OrderItemService,
    ) { }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Cart)
    addToCart(@Args('productId') pId: number, @CurrentUser() user): Promise<Cart> {
        return this.cartService.create({
            user_id: user.userId,
            product_id: pId,
            count: 1
        });
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Order])
    async orders(@CurrentUser() { userId: user_id }): Promise<Order[]> {
        return this.orderService.findBy({ user_id });
    }

    @ResolveField(() => OrderItem)
    items(@Parent() { id: order_id }: Order) {
        return this.orderItemService.findAll({ order_id });
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Order)
    async order(@CurrentUser() { userId: user_id }, @Args('id') id: number): Promise<Order> {
        const order = await this.orderService.findById(user_id);
        if (order.user_id === user_id) throw new ApolloError('Not found');
        return order;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Order)
    async createOrderFromCart(@CurrentUser() { userId: user_id }): Promise<Order> {
        const cart = await this.cartService.findBy({ user_id });

        if (!cart.length) {
            throw new ApolloError('Cart is empty');
        }

        const data = {
            user_id,
            created_at: (new Date().valueOf() as unknown) as bigint,
            items: cart.map(i => pick(i, 'product_id', 'count'))
        }

        return this.orderService.create(data);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async removeOrder(@Args('id') id: number, @CurrentUser() { userId: user_id }): Promise<boolean> {
        await this.orderService.delete(id);
        return true;
    }
}