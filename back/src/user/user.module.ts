import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { AuthResolver } from './auth.resolver';
import { CartResolver } from './cart.resolver';

import { GqlAuthGuard } from './guards/auth.guard';
import { JwtStrategy } from './jwt.stategy';
import { OrderResolver } from './order.resolver';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service ';
import { OrderItemService } from './services/order-item.service';
import { OrderService } from './services/order.service';
import { PasswordService } from './services/password.service';
import { UserService } from './services/user.service';
import { UserResolver } from './user.resolver';

@Module({
    providers: [
        PrismaService,
        UserService,
        AuthService,
        JwtStrategy,
        AuthResolver,
        UserResolver,
        PasswordService,
        GqlAuthGuard,
        CartResolver,
        OrderResolver,
        OrderService,
        CartService,
        ProductsService,
        OrderItemService
    ],
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: 'd7g7fN8Cf3Un33bf',
            signOptions: { expiresIn: '7d' },
        }),
    ],
})
export class UserModule { }
