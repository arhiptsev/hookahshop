// import { Injectable } from "@nestjs/common";
// import { VirtualTimeScheduler } from "rxjs";
// import { PrismaService } from "src/prisma/prisma.service";

// export abstract class DataService<T>  {

//     constructor(
//         private prisma: PrismaService
//     ) { }

//     public abstract entityName: string;

//     findAll(): Promise<Text[]> {
//         return this.prisma[this.entityName].findMany();
//     }

//     findBy(where: { [key: string]: any }): Promise<T[]> {
//         return this.prisma[this.entityName].findMany({ where });
//     }

//     findById(id: number): Promise<T> {
//         return this.prisma[this.entityName].findUnique({
//             where: {
//                 id
//             }
//         });
//     }
// }


// export class ServiceFactory {
//     public static createService(entityName) {
        
//     }
// }