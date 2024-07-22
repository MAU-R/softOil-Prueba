import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './auth/email/email.module';
import { LogService } from './log/log.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogInterceptor } from './log/log.interceptor';

@Module({
  imports: [AuthModule, PrismaModule, EmailModule],
  providers:[
    LogService,{
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor
    },
  ],
})
export class AppModule {}
