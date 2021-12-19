import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

import { PrismaModule } from '../prisma/prisma.module';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [
    ProductsResolver,
    CategoryResolver,
    ProductsService,
    CategoryService,
  ],
})
export class ProductsModule {}
