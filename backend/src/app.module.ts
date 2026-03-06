import { Module } from '@nestjs/common';
import { ClassesModule } from './class/class.module';
import { StudentsModule } from './student/student.module';

@Module({
  imports: [ClassesModule, StudentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
