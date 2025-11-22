import './App.css'
import { SideBar } from './components/SideBar'
import { TimeLinePanel } from './components/TimeLinePanel'
import { TasksView } from './components/TasksView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {


  return (
    <>
      <div className = "flex">
        <SideBar></SideBar>
        <TasksView></TasksView>
        <TimeLinePanel></TimeLinePanel>
      </div>


    </>
  )
}

export default App
