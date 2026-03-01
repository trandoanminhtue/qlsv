import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Body,
} from '@nestjs/common';
import { StudentsService } from './student.service';

@Controller('class/:classId/student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // GET /classes/:classId/students - Lấy tất cả học sinh của lớp
  @Get()
  findAll(@Param('classId', ParseIntPipe) classId: number) {
    return this.studentsService.findAllByClass(classId);
  }

  // GET /classes/:classId/students/:name - Lấy thông tin 1 học sinh
  @Get(':name')
  findOne(
    @Param('classId', ParseIntPipe) classId: number,
    @Param('name') name: string,
  ) {
    return this.studentsService.findOne(classId, decodeURIComponent(name));
  }

  // PUT /classes/:classId/students/:name - Sửa tên học sinh
  @Put(':name')
  update(
    @Param('classId', ParseIntPipe) classId: number,
    @Param('name') oldName: string,
    @Body() body: { newName: string },
  ) {
    return this.studentsService.update(
      classId,
      decodeURIComponent(oldName),
      body.newName,
    );
  }
}
