import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { Cart } from './entities/cart.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';
import { GqlAuthGuard } from './guards/auth.guard';
import { JwtStrategy } from './jwt.stategy';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service ';
import { OrderService } from './services/order.service';
import { PasswordService } from './services/password.service';
import { UserService } from './services/user.service';
import { UserResolver } from './user.resolver';

@Module({
    providers: [
        UserService,
        AuthService,
        JwtStrategy,
        AuthResolver,
        UserResolver,
        PasswordService,
        GqlAuthGuard,
        OrderService,
        CartService,
    ],
    imports: [
        TypeOrmModule.forFeature([User, Cart, Order, OrderItem]),
        JwtModule.register({
            secret: 'd7g7fN8Cf3Un33bf',
            signOptions: { expiresIn: '7d' },
        }),
    ],
})
export class UserModule { }
