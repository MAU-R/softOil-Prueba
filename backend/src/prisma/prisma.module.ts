import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
//Definicion del modulo de prisma para el PrismaService
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}