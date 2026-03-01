import { Module } from '@nestjs/common';
import { ClassesModule } from './class/class.module';
import { StudentsModule } from './student/student.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ClassesModule, StudentsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
