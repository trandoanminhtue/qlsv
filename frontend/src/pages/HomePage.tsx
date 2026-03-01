import React, { useState } from 'react';

// Định nghĩa cấu trúc của một Lớp học
interface ClassItem {
  id: number;
  name: string;
  students: string[];
}

const HomePage: React.FC = () => {
  // Quản lý danh sách lớp học (mảng các Object ClassItem)
  const [classList, setClassList] = useState<ClassItem[]>([]);
  
  // Trạng thái hiển thị Form "New" (true: hiện, false: ẩn)
  const [showNewForm, setShowNewForm] = useState<boolean>(false);
  
  // Lưu giá trị người dùng nhập vào ô tên lớp trong bảng New
  const [tempClassName, setTempClassName] = useState<string>('');

  // Hàm xử lý lưu lớp học mới
  const saveClass = () => {
    // Kiểm tra nếu tên lớp trống hoặc chỉ có khoảng trắng thì không cho lưu
    if (!tempClassName.trim()) {
      alert("Vui lòng nhập tên lớp");
      return;
    }

    // Tạo một đối tượng lớp học mới
    const newClass: ClassItem = {
      id: Date.now(), // Dùng timestamp làm ID duy nhất
      name: tempClassName,
      students: [] // Khởi tạo danh sách học sinh rỗng
    };

    // Cập nhật danh sách lớp: giữ lại lớp cũ và thêm lớp mới vào cuối
    setClassList([...classList, newClass]);
    
    // Reset các giá trị về mặc định sau khi lưu thành công
    setTempClassName('');
    setShowNewForm(false);
  };

  // Hàm thêm học sinh khi người dùng nhấn vào thẻ lớp học
  const addStudent = (id: number) => {
    // Dùng prompt để lấy tên học sinh nhanh (không cần tạo thêm form phức tạp)
    const studentName = prompt("Nhập tên học sinh mới:");
    
    // Nếu có nhập tên (không nhấn Cancel hoặc để trống)
    if (studentName && studentName.trim() !== "") {
      // Tìm lớp học có ID tương ứng và cập nhật mảng students của lớp đó
      setClassList(prevList => 
        prevList.map(c => 
          c.id === id ? { ...c, students: [...c.students, studentName] } : c
        )
      );
    }
  };

  return (
    <div className="homepage">
      {/* Header chứa thông tin User và nút New */}
      <header className="header">
        <div className="user-profile">
          <img src="https://ui-avatars.com/api/?name=Teacher" alt="avatar" />
          <span>Giáo viên: Nguyễn Văn A</span>
        </div>
        {/* Nhấn nút này sẽ bật trạng thái showNewForm lên true */}
        <button className="btn-new" onClick={() => setShowNewForm(true)}>+ New</button>
      </header>

      {/* Logic hiển thị Bảng thêm lớp mới (Chỉ hiện khi showNewForm === true) */}
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
                    />
                  </td>
                  <td>0 (Tự động)</td>
                </tr>
              </tbody>
            </table>
            <div className="action-btns">
              <button className="btn-save" onClick={saveClass}>Save</button>
              <button className="btn-cancel" onClick={() => setShowNewForm(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Khu vực hiển thị danh sách lớp học đã tạo */}
      <main className="content">
        <h2>Danh Sách Lớp Học</h2>
        {/* Nếu chưa có lớp nào thì hiện thông báo nhắc nhở */}
        {classList.length === 0 && <p>Chưa có lớp nào, hãy nhấn "New" để tạo.</p>}
        
        <div className="class-grid">
          {classList.map((item) => (
            <div key={item.id} className="class-card" onClick={() => addStudent(item.id)}>
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
                  {/* Join các tên học sinh trong mảng thành chuỗi cách nhau bởi dấu phẩy */}
                  {item.students.length > 0 ? item.students.join(', ') : 'Chưa có học sinh'}
                </div>
              </div>
              <p className="hint">Click vào thẻ này để thêm học sinh</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;