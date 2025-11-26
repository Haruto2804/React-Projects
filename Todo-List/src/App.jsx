import './App.css'
import { HomePage } from './pages/HomePagePage/HomePage.jsx'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { TasksView } from './pages/Tasks/TasksView'
import { DetailsTodoPage } from './pages/DetailsTodoPage.jsx'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
const getInitialTodos = () => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    // Nếu có dữ liệu, chuyển từ chuỗi JSON thành đối tượng JavaScript
    return JSON.parse(storedTodos);
  }
  // Nếu không có, trả về mảng rỗng để khởi tạo
  return [];
};
// newTaskData: Local Storage Data, currentTodos, useState todo hiện tại, lấy từ API
const mergeTodoData = (currentTodos, newTaskData) => {
  const newTaskMap = new Map();
  newTaskData.forEach(task => {
    newTaskMap.set(task.id, task);
  })

  // mergeList co nghia la kiem tra du lieu tu API co trong Local Storage hay ko, nếu có thì đem các thuộc
  // tính mới (nếu có) của Local Storage ghi đè vào data của API rồi trả về
  const mergeList = currentTodos.map((task) => {
    const newData = newTaskMap.get(task.id);
    if (newData) {
      return {
        ...newData,
        ...task,
      }
    }
    // nếu Local Storage ko có todo trong API thì trả về data của API mà ko làm gì
    return task;
  })
  // lọc tập Set các ID API
  const currentId = new Set(currentTodos.map((task) => task.id));
  // lọc các data của LocalStorage mà chưa có trong API
  const newlyAddTasked = newTaskData.filter(task => !currentId.has(task.id));
  return [
    ...mergeList, // mảng data của API
    ...newlyAddTasked // mảng data của Local Storage
    // hợp nhất 2 dữ liệu lại với nhau
  ]
}

function App() {
  const [todo, setTodos] = useState(getInitialTodos);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars

  const getTasks = async () => {
    const storedLocalStorageTodoData = getInitialTodos();
    try {
      const response = await axios.get('https://dummyjson.com/todos');
      const priorityLevels = ["High", "Medium", "Completed", "Low",];
      const tasksWithPriority = response.data.todos.map((task) => {
        let priority = priorityLevels[Math.floor(Math.random() * priorityLevels.length)];


        if (task.completed) {
          priority = "Completed"
        }
        else if (task.id % 3 === 0) {
          priority = "High";
        } else if (task.id % 2 === 0) {
          priority = "Medium";
        }
        else {
          priority = "Low";
        }
        return {
          ...task, // Giữ lại các trường cũ (id, todo, completed)
          priority: priority,
          isDeleted: false,
          // Thêm trường priority mới
        };
      })
      const mergeData = mergeTodoData(tasksWithPriority, storedLocalStorageTodoData);
      setTodos(mergeData);
      setError(null);
    }
    catch (err) {
      console.error("Lỗi khi tải dữ liệu: ", err);
      setError("Không thể tải danh sách công việc. Vui lòng kiểm tra kết nối.");
      setTodos([]);
    }
    finally {
      setIsLoading(false);
    }
  }
  const addTasks = async (newTaskData) => {
    //Dùng API để add dữ liệu
    // try {
    //   const response = await axios.post('https://dummyjson.com/todos/add', newTaskData);
    //   const addNewTask = response.data;
    //   const finalTask = {
    //     ...addNewTask,
    //     id: crypto.randomUUID(),
    //     priority: newTaskData.priority,
    //     name: newTaskData.name,
    //     date: newTaskData.date,
    //     isDeleted: false
    //   }
    //   setTodos(prevTodos => [
    //     finalTask,
    //     ...prevTodos
    //   ])
    //   setError(null);
    // } catch (err) {
    //   console.log("Loi khi them cong viec: ", err);
    //   setError("Không thể thêm công việc. Vui lòng kiểm tra lại dữ liệu.");
    // } finally {
    //   setIsLoading(false);
    // }
    //Code xử lí add
    setTodos(prevTodo => {
      return [
        newTaskData,
        ...prevTodo
      ]
    })
    setError(null);
  }
  const deleteTask = async (taskId) => {
    //Xóa bằng cách gọi API, thêm isDeleted từ API trả về đưa vào task, nhưng todo thật sự chưa có xóa khỏi danh sach
    // try {
    //   const response = await axios.delete(`https://dummyjson.com/todos/1`);

    //   const deletedTaskData = response.data;
    //   console.log(`Task sau khi xóa ${taskId} đã được xóa!`);
    //   setTodos(prevTodos => {
    //     return prevTodos.map(task => {
    //       if (task.id === taskId) {
    //         return {
    //           ...task,
    //           ...deletedTaskData
    //         }
    //       }
    //     })
    //   })
    //   setError(null);
    // } catch (err) {
    //   console.error('Lỗi khi xóa task:', err);
    //   setError("Không thể xóa task. Vui lòng kiểm tra kết nối.");
    // } finally {
    //   setIsLoading(false);
    // }
    //Xóa bằng cách dùng code của bản thân
    console.log('task can xoa', taskId)
    const newDataTodo = todo.filter((task) => task.id != taskId); // trả về danh sách todo ko có taskID cần xóa
    setTodos(newDataTodo);
    console.log('task vua xoa', newDataTodo);
    setError(null);
  }
  const updateTask = (taskToUpdate) => {
    console.log('task can up date, (details),', taskToUpdate)
    setTodos(prevTodo => {
      return prevTodo.map((task) => {
        if (task.id === taskToUpdate.id) {
          return {
            ...task,
            ...taskToUpdate
          };
        }
        console.log('bo qua task',task)
        return task;
      })
    })
    setError(null);
    console.log('Todo sau khi cap nhat',todo);
  }

  const handleToggleCompleted = useCallback((taskId) => {
    setTodos(prevTask =>
      prevTask.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }, [])
  useEffect(() => {
    setTodos([
      {
        "completed": false,
        "date": "2026-01-15",
        "description": "Lập kế hoạch chi tiết cho dự án 'Nền tảng Thương mại Điện tử Đa Quốc gia'. Bao gồm phân tích yêu cầu, thiết kế kiến trúc hệ thống, và xác định các công nghệ chủ chốt (Microservices, Kafka, React). Phải hoàn thành trước buổi họp tổng kết Quý 1.",
        "id": "e4f8d2a6-c1b0-4e5a-8b3d-1c9f0e7a2b4c",
        "isDeleted": false,
        "name": "Hoàn thiện Kế hoạch Kiến trúc Dự án E-Commerce Lớn",
        "priority": "Completed",
        "userId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
      },
      {
        "completed": true,
        "date": "2025-12-01",
        "description": "Thực hiện kiểm thử hồi quy toàn diện (full regression testing) cho phiên bản 3.2.1 của ứng dụng di động trên cả hai nền tảng iOS và Android. Cần ghi lại chi tiết các lỗi tìm thấy và tạo JIRA tickets tương ứng với mức độ ưu tiên 'Blocker' hoặc 'Major'.",
        "id": "b3c7f0d1-a9e2-47b8-8c1d-6f5e4d3c2b1a",
        "isDeleted": false,
        "name": "Kiểm thử Hồi quy Toàn diện cho Ứng dụng Di động v3.2.1",
        "priority": "High",
        "userId": "q9r8s7t6-u5v4-w3x2-y1z0-a9b8c7d6e5f4"
      },
      {
        "completed": false,
        "date": "2026-03-20",
        "description": "Nghiên cứu sâu về việc tích hợp API Trí tuệ Nhân tạo mới nhất từ nhà cung cấp 'TechGenius' vào quy trình xử lý dữ liệu khách hàng. Mục tiêu là tự động hóa 40% công việc phân loại và gắn nhãn (tagging) dữ liệu thô. Lập báo cáo feasibility report.",
        "id": "f5a9e3b7-d1c8-40f2-9e6a-7b8c9d0e1f2g",
        "isDeleted": false,
        "name": "Nghiên cứu và Tích hợp API AI cho Xử lý Dữ liệu",
        "priority": "Medium",
        "userId": "h7i6j5k4-l3m2-n1o0-p9q8-r7s6t5u4v3w2"
      },
      {
        "completed": false,
        "date": "2026-02-10",
        "description": "Viết tài liệu hướng dẫn sử dụng (User Manual) và tài liệu kỹ thuật (Technical Specification) chi tiết cho Module Thanh toán mới, bao gồm các kịch bản lỗi, mã phản hồi (response codes), và quy trình bảo mật PCI-DSS. Tài liệu phải được đồng bộ lên Confluence.",
        "id": "c0d1e2f3-g4h5-6i7j-8k9l-0m1n2o3p4q5r",
        "isDeleted": false,
        "name": "Tạo Tài liệu Kỹ thuật và Hướng dẫn cho Module Thanh toán",
        "priority": "High",
        "userId": "w1x2y3z4-a5b6-c7d8-e9f0-g1h2i3j4k5l6"
      },
      {
        "completed": false,
        "date": "2026-04-05",
        "description": "Tổ chức và điều hành buổi hội thảo nội bộ về 'Các Phương pháp Phát triển Linh hoạt (Agile) và DevOps' cho toàn bộ đội ngũ kỹ sư. Chuẩn bị slide, tài liệu handouts, và một ví dụ thực tế (hands-on example) về CI/CD pipeline.",
        "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "isDeleted": false,
        "name": "Hội thảo Nội bộ về Quy trình Agile và DevOps",
        "priority": "Medium",
        "userId": "m9n8o7p6-q5r4-s3t2-u1v0-w9x8y7z6a5b4"
      },
      {
        "completed": false,
        "date": "2026-01-25",
        "description": "Tối ưu hóa hiệu suất của truy vấn cơ sở dữ liệu (Database Query Optimization) trên cụm máy chủ Production. Tập trung vào các stored procedures xử lý dữ liệu người dùng hoạt động kém nhất (top 5 slowest queries) để giảm thời gian phản hồi trung bình 30%.",
        "id": "d7e8f9a0-b1c2-3d4e-5f6g-7h8i9j0k1l2m",
        "isDeleted": false,
        "name": "Tối ưu hóa Truy vấn Cơ sở Dữ liệu Sản phẩm",
        "priority": "Completed",
        "userId": "z1y2x3w4-v5u6-t7s8-r9q0-p1o2n3m4l5k6"
      },
      {
        "completed": true,
        "date": "2025-11-30",
        "description": "Lên lịch trình cho việc triển khai (deployment schedule) phiên bản bảo mật mới nhất lên môi trường Staging và Production. Phải có kế hoạch rollback chi tiết và thông báo cho tất cả các bên liên quan (Stakeholders) 48 giờ trước khi thực hiện.",
        "id": "b97e6a79-d792-48b5-8b5e-5def37a73d39",
        "isDeleted": false,
        "name": "Lên lịch Triển khai Phiên bản Bảo mật Mới",
        "priority": "High",
        "userId": "857ed9b8-e649-46eb-ac6d-ecf246e7152e"
      },
      {
        "completed": false,
        "date": "2026-03-01",
        "description": "Thiết kế lại giao diện người dùng (UI/UX Redesign) cho trang 'Quản lý Tài khoản Khách hàng' để cải thiện tỷ lệ chuyển đổi (conversion rate) trong việc cập nhật thông tin cá nhân. Chuẩn bị wireframes, mockups độ phân giải cao, và bản prototype tương tác.",
        "id": "0j9i8h7g-6f5e-4d3c-2b1a-0z9y8x7w6v5u",
        "isDeleted": false,
        "name": "Thiết kế Lại Giao diện Quản lý Tài khoản Khách hàng",
        "priority": "Medium",
        "userId": "s5r4q3p2-o1n0-m9l8-k7j6-i5h4g3f2e1d0"
      },
      {
        "completed": false,
        "date": "2026-02-28",
        "description": "Nghiên cứu các tiêu chuẩn và quy định mới nhất về Bảo mật Dữ liệu Châu Âu (GDPR) và California (CCPA). Cập nhật chính sách bảo mật của công ty và đảm bảo hệ thống tuân thủ 100% trước thời hạn luật định sắp tới.",
        "id": "1k2l3m4n-5o6p-7q8r-9s0t-1u2v3w4x5y6z",
        "isDeleted": false,
        "name": "Cập nhật Tuân thủ Quy định Bảo mật Dữ liệu (GDPR/CCPA)",
        "priority": "Completed",
        "userId": "f7e6d5c4-b3a2-z1y0-x9w8-v7u6t5s4r3q2"
      },
      {
        "completed": false,
        "date": "2026-01-05",
        "description": "Phân tích nhật ký lỗi (error logs) từ máy chủ Production trong 7 ngày gần nhất. Xác định nguyên nhân gốc rễ (Root Cause Analysis - RCA) cho lỗi '500 Internal Server Error' xảy ra vào 3:00 AM mỗi ngày và triển khai bản vá lỗi khẩn cấp.",
        "id": "9s8t7u6v-5w4x-3y2z-1a0b-9c8d7e6f5g4h",
        "isDeleted": false,
        "name": "Phân tích và Khắc phục Lỗi Máy chủ Định kỳ",
        "priority": "High",
        "userId": "v3u2t1s0-r9q8-p7o6-n5m4-l3k2j1i0h9g8"
      }
    ])
  }, []);

  const handleDeleteAllCurrentView = (taskCurrentViews) => {
    const newSetIdTaskCurrentView = new Set(taskCurrentViews);
    const newTodoAfterDelete = todo.filter((task) => {
      return !newSetIdTaskCurrentView.has(task.id);
    })
    setTodos(newTodoAfterDelete);
    localStorage.setItem('todos', []); // dọn dữ liệu trong local Storage
  }
  useEffect(() => {
    // 1. Kiểm tra xem dữ liệu có tồn tại không trước khi lưu
    if (todo.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todo));
    }
  }, [todo]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage updateTask={updateTask} handleDeleteAllCurrentView={handleDeleteAllCurrentView} deleteTask={deleteTask} handleToggleCompleted={handleToggleCompleted} addTasks={addTasks} todo={todo} setTodos={setTodos} />}>
          <Route path="/tasks/all" element={<TasksView />} />
          <Route path="/tasks/today" element={<TasksView />} />
          <Route path="/tasks/upcoming" element={<TasksView />} />
          <Route path="/tasks/completed" element={<TasksView />} />
        </Route>
        <Route path="/tasks/details/:taskId" element={<DetailsTodoPage updateTask={updateTask} deleteTask={deleteTask} todo={todo} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
