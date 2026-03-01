import { Module } from '@nestjs/common';
import { ClassesController } from './class.controller';
import { ClassesService } from './class.service';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService], // Cho phép module khác dùng service này
})
export class ClassesModule {}
