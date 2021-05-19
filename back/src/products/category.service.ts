import { category } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {

    constructor(
        public prisma: PrismaService
    ) { }

    findAll(): Promise<category[]> {
        return this.prisma.category.findMany();
    }

    findBy(where: { [key: string]: any }): Promise<category[]> {
        return this.prisma.category.findMany({ where });
    }

    findById(id: number): Promise<category> {
        return this.prisma.category.findUnique({
            where: {
                id
            }
        });
    }
}
