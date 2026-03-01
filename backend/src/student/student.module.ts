import { Module } from '@nestjs/common';
import { StudentsController } from './student.controller';
import { StudentsService } from './student.service';
import { ClassesModule } from '../class/class.module';

@Module({
  imports: [ClassesModule], // Cần ClassesService
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
