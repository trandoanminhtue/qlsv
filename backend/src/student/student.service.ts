import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassesService } from '../class/class.service';

@Injectable()
export class StudentsService {
  constructor(private readonly classesService: ClassesService) {}

  // Lấy tất cả học sinh của 1 lớp
  findAllByClass(classId: number) {
    const classItem = this.classesService.findOne(classId);
    return classItem.students;
  }

  // Lấy thông tin 1 học sinh (tìm theo tên trong lớp)
  findOne(classId: number, studentName: string) {
    const classItem = this.classesService.findOne(classId);
    const student = classItem.students.find((s) => s === studentName);
    if (!student) {
      throw new NotFoundException(`Không tìm thấy học sinh ${studentName}`);
    }
    return student;
  }

  // Cập nhật tên học sinh
  update(classId: number, oldName: string, newName: string) {
    const classItem = this.classesService.findOne(classId);
    const index = classItem.students.findIndex((s) => s === oldName);
    if (index === -1) {
      throw new NotFoundException(`Không tìm thấy học sinh ${oldName}`);
    }
    classItem.students[index] = newName;
    return classItem;
  }
}
