import React, { useState, useEffect } from 'react';

// Định nghĩa cấu trúc của một Lớp học
interface ClassItem {
  id: number;
  name: string;
  students: string[];
}

const API_BASE_URL = 'http://localhost:3000'; // URL của backend NestJS

const HomePage: React.FC = () => {
  // Quản lý danh sách lớp học
  const [classList, setClassList] = useState<ClassItem[]>([]);
  
  // Trạng thái hiển thị Form "New"
  const [showNewForm, setShowNewForm] = useState<boolean>(false);
  
  // Lưu giá trị người dùng nhập vào ô tên lớp
  const [tempClassName, setTempClassName] = useState<string>('');
  
  // Trạng thái loading để UX tốt hơn
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  // 1. Gọi API GET khi component load - FETCH TRỰC TIẾP
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setInitialLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/classes`);
      if (!response.ok) {
        throw new Error('Lỗi khi tải dữ liệu');
      }
      const data = await response.json();
      setClassList(data);
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Không thể tải danh sách lớp từ server!');
    } finally {
      setInitialLoading(false);
    }
  };

  // 2. Hàm xử lý lưu lớp học mới - FETCH TRỰC TIẾP
  const saveClass = async () => {
    if (!tempClassName.trim()) {
      alert("Vui lòng nhập tên lớp");
      return;
    }

    setLoading(true);
    try {
      // Gọi API POST trực tiếp
      const response = await fetch(`${API_BASE_URL}/classes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tempClassName })
      });

      if (!response.ok) {
        throw new Error('Lỗi khi tạo lớp');
      }

      const newClass = await response.json();
      
      // Cập nhật state
      setClassList([...classList, newClass]);
      
      // Reset form
      setTempClassName('');
      setShowNewForm(false);
      alert('Tạo lớp thành công!');
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Không thể tạo lớp. Kiểm tra kết nối server!');
    } finally {
      setLoading(false);
    }
  };

  // 3. Hàm thêm học sinh - FETCH TRỰC TIẾP
  const addStudent = async (id: number) => {
    const studentName = prompt("Nhập tên học sinh mới:");
    
    if (studentName && studentName.trim() !== "") {
      setLoading(true);
      try {
        // Gọi API POST thêm học sinh trực tiếp
        const response = await fetch(`${API_BASE_URL}/classes/${id}/students`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: studentName })
        });

        if (!response.ok) {
          throw new Error('Lỗi khi thêm học sinh');
        }

        const updatedClass = await response.json();
        
        // Cập nhật state
        setClassList(prevList => 
          prevList.map(c => c.id === id ? updatedClass : c)
        );
        
        alert('Thêm học sinh thành công!');
      } catch (error) {
        console.error('Lỗi:', error);
        alert('Không thể thêm học sinh. Kiểm tra kết nối server!');
      } finally {
        setLoading(false);
      }
    }
  };

  // 4. Hàm xóa lớp (thêm cho vui)
  const deleteClass = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Không trigger sự kiện click của thẻ cha
    
    if (window.confirm('Bạn có chắc muốn xóa lớp này?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/classes/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Lỗi khi xóa lớp');
        }

        // Cập nhật state: xóa lớp khỏi danh sách
        setClassList(prevList => prevList.filter(c => c.id !== id));
        alert('Xóa lớp thành công!');
      } catch (error) {
        console.error('Lỗi:', error);
        alert('Không thể xóa lớp!');
      }
    }
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="user-profile">
          <img src="https://ui-avatars.com/api/?name=Teacher" alt="avatar" />
          <span>Giáo viên: Nguyễn Văn A</span>
        </div>
        <button 
          className="btn-new" 
          onClick={() => setShowNewForm(true)}
          disabled={loading || initialLoading}
        >
          {loading ? 'Đang xử lý...' : '+ New'}
        </button>
      </header>

      {/* Form tạo lớp mới */}
      {showNewForm && (
        <div className="modal-overlay">
          <div className="new-class-table">
            <h3>Tạo lớp học mới</h3>
            <table border={1}>
              <thead>
                <tr>
                  <th>Tên lớp</th>
                  <th>Số lượng học sinh</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input 
                      type="text" 
                      value={tempClassName} 
                      onChange={(e) => setTempClassName(e.target.value)}
                      placeholder="Nhập tên lớp..."
                      autoFocus
                      disabled={loading}
                    />
                  </td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
            <div className="action-btns">
              <button 
                className="btn-save" 
                onClick={saveClass}
                disabled={loading}
              >
                {loading ? 'Đang lưu...' : 'Save'}
              </button>
              <button 
                className="btn-cancel" 
                onClick={() => setShowNewForm(false)}
                disabled={loading}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Danh sách lớp học */}
      <main className="content">
        <h2>Danh Sách Lớp Học</h2>
        
        {initialLoading && <p>Đang tải dữ liệu từ server...</p>}
        
        {!initialLoading && classList.length === 0 && (
          <p>Chưa có lớp nào, hãy nhấn "New" để tạo.</p>
        )}
        
        <div className="class-grid">
          {classList.map((item) => (
            <div 
              key={item.id} 
              className="class-card" 
              onClick={() => !loading && addStudent(item.id)}
              style={{ 
                opacity: loading ? 0.7 : 1, 
                cursor: loading ? 'wait' : 'pointer',
                position: 'relative'
              }}
            >
              {/* Nút xóa */}
              <button 
                onClick={(e) => deleteClass(item.id, e)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '25px',
                  height: '25px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>

              <table border={1}>
                <thead>
                  <tr>
                    <th>Tên lớp</th>
                    <th>Sĩ số</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>{item.name}</td>
                    <td>{item.students.length}</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="student-list">
                <strong>Danh sách:</strong>
                <div className="names">
                  {item.students.length > 0 ? item.students.join(', ') : 'Chưa có học sinh'}
                </div>
              </div>
              <p className="hint">Click vào thẻ để thêm học sinh</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;