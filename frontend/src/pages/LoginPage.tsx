import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Menu</h1>
      <button onClick={() => navigate('/home')}>Đăng nhập</button>
      <br />
    </div>
  );
};

export default LoginPage;