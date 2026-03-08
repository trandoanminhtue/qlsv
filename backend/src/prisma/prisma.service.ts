import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Tự động kết nối database khi module được khởi tạo
    await this.$connect();
    console.log('📦 Đã kết nối database thành công!');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
