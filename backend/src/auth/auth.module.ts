import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from './email/email.module';
//Modulo de nest para el Auth. definimos los imports para poder usar los modulos de primsa y el de mensajeria email
@Module({
  imports: [PrismaModule, EmailModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}