import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { TasksView } from './pages/Tasks/TasksView'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
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
