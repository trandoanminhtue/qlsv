import React, { useState, useEffect } from 'react';

// Interface giữ nguyên
interface ClassItem {
  id: number;
  name: string;
  students: string[];
}

const HomePage: React.FC = () => {
  const [classList, setClassList] = useState<ClassItem[]>([]);
  const [showNewForm, setShowNewForm] = useState<boolean>(false);
  const [tempClassName, setTempClassName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // LOAD DỮ LIỆU KHI VÀO TRANG
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/classes');
      const data = await response.json();
      setClassList(data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      alert('Không thể kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  // SỬA LẠI saveClass - GỌI API
  const saveClass = async () => {
    if (!tempClassName.trim()) {
      alert("Vui lòng nhập tên lớp");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tempClassName })
      });

      if (!response.ok) {
        throw new Error('Lỗi khi tạo lớp');
      }

      const newClass = await response.json();
      
      // Cập nhật state với dữ liệu từ server (có ID thật)
      setClassList([...classList, newClass]);
      setTempClassName('');
      setShowNewForm(false);
    } catch (error) {
      alert('Không thể tạo lớp mới');
    }
  };

  // SỬA LẠI addStudent - GỌI API
  const addStudent = async (id: number) => {
    const studentName = prompt("Nhập tên học sinh mới:");
    if (!studentName?.trim()) return;

    try {
      const response = await fetch(`http://localhost:3000/classes/${id}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: studentName })
      });

      if (!response.ok) {
        throw new Error('Lỗi khi thêm học sinh');
      }

      const updatedClass = await response.json();
      
      // Cập nhật state với dữ liệu mới từ server
      setClassList(prevList => 
        prevList.map(c => c.id === id ? updatedClass : c)
      );
    } catch (error) {
      alert('Không thể thêm học sinh');
    }
  };

  // THÊM CHỨC NĂNG XÓA LỚP
  const deleteClass = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Không trigger sự kiện click của card
    
    if (!confirm('Bạn có chắc muốn xóa lớp này?')) return;

    try {
      const response = await fetch(`http://localhost:3000/classes/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Lỗi khi xóa lớp');
      }

      setClassList(prevList => prevList.filter(c => c.id !== id));
    } catch (error) {
      alert('Không thể xóa lớp');
    }
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="user-profile">
          <img src="https://ui-avatars.com/api/?name=Teacher" alt="avatar" />
          <span>Giáo viên: Nguyễn Văn A</span>
        </div>
        <button className="btn-new" onClick={() => setShowNewForm(true)}>+ New</button>
      </header>

      {/* Form tạo lớp mới (giữ nguyên) */}
      {showNewForm && (...)}

      <main className="content">
        <h2>Danh Sách Lớp Học</h2>
        {loading && <p>Đang tải dữ liệu...</p>}
        {!loading && classList.length === 0 && <p>Chưa có lớp nào, hãy nhấn "New" để tạo.</p>}
        
        <div className="class-grid">
          {classList.map((item) => (
            <div key={item.id} className="class-card" onClick={() => addStudent(item.id)}>
              {/* THÊM NÚT XÓA */}
              <button 
                className="btn-delete"
                onClick={(e) => deleteClass(item.id, e)}
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