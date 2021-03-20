
import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { userInfo } from 'os';
import { Cart } from './entities/cart.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { GqlAuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service ';
import { OrderService } from './services/order.service';
import { PasswordService } from './services/password.service';
import { UserService } from './services/user.service';
import { OrderInputData, RegistrationResponse } from './types/types';
import { CurrentUser } from './utils/current-user';



@Resolver('User')
export class UserResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly cartService: CartService,
        private readonly orderService: OrderService,
        private readonly passwordService: PasswordService
    ) { }

    @Query('registration')
    async getLogin(@Args('username') username: string, @Args('password') password: string): Promise<RegistrationResponse> {
        
        const isExist = await this.authService.checkUserExist(username);

        if (isExist) {
            throw new GraphQLError('Username already existing');
        }

        const passwordHash = this.passwordService.getHash(password);

        await this.userService.addUser({
            username: username,
            password: passwordHash,
            created_at: new Date().getTime()
        });

        return {
            isSuccess: true
        }

    }
    @UseGuards(GqlAuthGuard)
    @Mutation('addToCart')
    async addToCart(@Args('productId') pId, @CurrentUser() user): Promise<Cart> {

        return this.cartService.addToCart({
            user_id: user.userId,
            product_id: pId,
            count: 1
        });
    }

    @UseGuards(GqlAuthGuard)
    @Query('cart')
    async getCart(@CurrentUser() user): Promise<Cart[]> {
        return this.cartService.getCard(user.userId);
    }

    @UseGuards(GqlAuthGuard)
    @Query('orders')
    async getOrders(@CurrentUser() user): Promise<Order[]> {
        return this.orderService.getOrders(user.userId);
    }


    @UseGuards(GqlAuthGuard)
    @Query('order')
    async getOrder(@CurrentUser() user, @Args('id') id: number): Promise<Order[]> {
        return this.orderService.getOrders(user.userId);
    }


    @UseGuards(GqlAuthGuard)
    @Mutation('addOrder')
    async addOrder(@CurrentUser() user, @Args('order') data: OrderInputData): Promise<Order> {
        data.user_id = user.userId;
        return this.orderService.addOrder(JSON.parse(JSON.stringify(data)));
    }


    @UseGuards(GqlAuthGuard)
    @Mutation('createOrderFromCart')
    async createOrderFromCart(@CurrentUser() user): Promise<Order> {
        return this.orderService.createOrderFromCart(user.userId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation('removeOrder')
    async removeOrder(@Args('id') id: number, @CurrentUser() user): Promise<{ isSuccess: boolean }> {
        return this.orderService.removeOrder(id, user.userId).then(() => ({ isSuccess: true }));
    }

    @UseGuards(GqlAuthGuard)
    @Mutation('removeFromCart')
    async removeFromCart(@Args('id') id: number): Promise<{ isSuccess: boolean }> {
        return this.cartService.removeFromCart(id).then(() => ({ isSuccess: true }));
    }

}