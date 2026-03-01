import { Injectable, NotFoundException } from '@nestjs/common';

// Định nghĩa interface giống với frontend
export interface ClassItem {
  id: number;
  name: string;
  students: string[];
}

@Injectable()
export class ClassesService {
  // Dữ liệu giả lập trong memory (thay cho database)
  private classes: ClassItem[] = [];
  private currentId = 1;

  // Lấy tất cả lớp học
  findAll(): ClassItem[] {
    return this.classes;
  }

  // Tìm lớp học theo ID
  findOne(id: number): ClassItem {
    const classItem = this.classes.find((c) => c.id === id);
    if (!classItem) {
      throw new NotFoundException(`Không tìm thấy lớp học với ID ${id}`);
    }
    return classItem;
  }

  // Tạo lớp học mới
  create(name: string): ClassItem {
    const newClass: ClassItem = {
      id: this.currentId++, // Tự tăng ID
      name: name,
      students: [],
    };
    this.classes.push(newClass);
    return newClass;
  }

  // Thêm học sinh vào lớp
  addStudent(classId: number, studentName: string): ClassItem {
    const classItem = this.findOne(classId);
    classItem.students.push(studentName);
    return classItem;
  }

  // Xóa lớp học
  remove(id: number): void {
    const index = this.classes.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Không tìm thấy lớp học với ID ${id}`);
    }
    this.classes.splice(index, 1);
  }

  // Xóa học sinh khỏi lớp
  removeStudent(classId: number, studentName: string): ClassItem {
    const classItem = this.findOne(classId);
    classItem.students = classItem.students.filter((s) => s !== studentName);
    return classItem;
  }
}
