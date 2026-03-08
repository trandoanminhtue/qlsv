import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  // Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ClassesService } from './class.service';

@Controller('classes') // Base path: /classes
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  // GET /classes - Lấy danh sách tất cả lớp
  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  // GET /classes/:id - Lấy chi tiết 1 lớp
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.findOne(id);
  }

  // POST /classes - Tạo lớp mới
  @Post()
  create(@Body() body: { name: string }) {
    return this.classesService.create(body.name);
  }

  // POST /classes/:id/students - Thêm học sinh vào lớp
  @Post(':id/students')
  addStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string },
  ) {
    return this.classesService.addStudent(id, body.name);
  }

  // DELETE /classes/:id - Xóa lớp
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.classesService.remove(id);
    return { message: 'Xóa lớp thành công' };
  }

  // DELETE /classes/:id/students/:studentName - Xóa 1 học sinh
  @Delete(':id/students/:studentName')
  removeStudent(
    @Param('id', ParseIntPipe) id: number,
    @Param('studentName') studentName: string,
  ) {
    return this.classesService.removeStudent(
      id,
      decodeURIComponent(studentName),
    );
  }
}
