import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}

  async logActivity(activity: string) {
    await this.prisma.activity_log.create({
      data: {
        activity,
        timestamp: new Date(),
      },
    });
  }
}
