import axios from 'axios';

// Địa chỉ backend
const API_BASE_URL = 'http://localhost:3001/api';

// Tạo instance axios với cấu hình mặc định
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API cho Class
export const classApi = {
  // Lấy tất cả lớp
  getAll: () => api.get('/classes'),
  
  // Lấy một lớp theo ID
  getOne: (id: number) => api.get(`/classes/${id}`),
  
  // Tạo lớp mới
  create: (data: { name: string }) => api.post('/classes', data),
  
  // Cập nhật lớp
  update: (id: number, data: { name: string }) => api.patch(`/classes/${id}`, data),
  
  // Xóa lớp
  delete: (id: number) => api.delete(`/classes/${id}`),
};