import React from 'react';

// Định nghĩa kiểu dữ liệu cho Props (dữ liệu truyền từ App vào)
interface LoginPageProps {
  onLogin: () => void; // Hàm xử lý khi nhấn nút đăng nhập
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="login-container">
      <h1>QUẢN LÝ TRUNG TÂM</h1>
      <p>Dành cho Giáo viên</p>
      {/* Khi click, gọi hàm onLogin được truyền từ App.tsx để đổi trạng thái screen */}
      <button className="btn-login" onClick={onLogin}>Đăng nhập</button>
    </div>
  );
};

export default LoginPage;