import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { Article } from './article.entity';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { UserModule } from './user/user.module';
import { CategoryResolver } from './category.resolver';
import { join } from 'path';
import { RequestService } from './request.service';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Article, Product, Category]),
    GraphQLModule.forRoot({
      typePaths: ['./**/**.graphql', '*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      context: ({ req }) => ({ req }),
      playground: true
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    RequestService,
    AppService,
    AppResolver,
    CategoryResolver,
  ],
})
export class AppModule { }
