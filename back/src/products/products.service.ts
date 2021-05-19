import { product } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {

    constructor(
        public prisma: PrismaService
    ) { }

    findAll(): Promise<product[]> {
        return this.prisma.product.findMany();
    }

    findBy(where: { [key: string]: any }): Promise<product[]> {
        return this.prisma.product.findMany({ where });
    }

    findById(id: number): Promise<product> {
        return this.prisma.product.findUnique({
            where: {
                id
            }
        });
    }

    create(data: Omit<product, 'id'>): Promise<product> {
        return this.prisma.product.create({ data });
    }

    delete(id: number): Promise<product> {
        return this.prisma.product.delete({ where: { id } })
    }
}
