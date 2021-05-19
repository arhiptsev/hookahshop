import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { RequestService } from './request.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { DatasourceModule } from './datasource/datasource.module';


@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: ({ req }) => ({ req }),
      playground: true
    }),
    UserModule,
    ProductsModule,
    DatasourceModule
  ],
  controllers: [AppController],
  providers: [
    RequestService,
    // AppResolver,
  ],
})
export class AppModule { }
