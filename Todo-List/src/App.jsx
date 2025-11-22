import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { TasksView } from './pages/Tasks/TasksView'
import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [todo, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const getTasks = async () => {
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
          priority: priority // Thêm trường priority mới
        };
      })
      setTodos(tasksWithPriority);
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
  useEffect(() => {
    getTasks();
  }, []);
  if (isLoading) {
    return (
      <div className="p-8 text-lg">Đang tải dữ liệu công việc</div>
    )
  }
  if (error) {
    return (
      <div className="p-8 text-red-800 text-lg">Lỗi:{error}</div>
    )
  }
  console.log(todo);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage todo={todo} />}>
          <Route path="/tasks/all" element={<TasksView />} />
          <Route path="/tasks/today" element={<TasksView />} />
          <Route path="/tasks/upcoming" element={<TasksView />} />
          <Route path="/tasks/completed" element={<TasksView />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App
