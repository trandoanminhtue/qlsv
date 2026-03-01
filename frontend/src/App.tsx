import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  // State quản lý việc điều hướng (Routing) đơn giản
  // 'login': hiện trang Đăng nhập | 'home': hiện trang Chủ
  const [currentScreen, setCurrentScreen] = useState<'login' | 'home'>('login');

  // Hàm để chuyển sang màn hình trang chủ
  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="app-container">
      {/* Kiểm tra điều kiện để render trang tương ứng */}
      {currentScreen === 'login' ? (
        <LoginPage onLogin={navigateToHome} />
      ) : (
        <HomePage />
      )}
    </div>
  );
}

export default App;