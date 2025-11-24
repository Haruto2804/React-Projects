import { SideBar } from '../../GeneralComponents/SideBarComponent/SideBar'
import { TimeLinePanel } from '../../GeneralComponents/TimeLinePanelComponent/TimeLinePanel'
import { AddNewTaskModal } from '../../GeneralComponents/AddNewTaskModalComponent/AddNewTaskModal'
import { TasksView } from '../Tasks/TasksView'
import { useState, useCallback } from 'react'
import { DeleteConfirm } from '../../GeneralComponents/Confirm/DeleteConfirm'
import { UpdateConfirm } from '../../GeneralComponents/Confirm/UpdateConfirm'
import { UpdateTask } from '../../GeneralComponents/UpdateTask/UpdateTask'
export function HomePage({ deleteTask, handleToggleCompleted, addTasks, todo }) {
  const [isOpenAddNewTask, setIsOpenAddNewTask] = useState(false);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);
  const [isOpenUpdateTask, setIsOpenUpdateTask] = useState(false);
  const [isOpenUpdateConfirm, setIsOpenUpdateConfirm] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const memorizedHandleAddNewTask = useCallback(() => {
    setIsOpenAddNewTask(isOpen => !isOpen);
  }, [])

  const handleDeleteConfirm = useCallback((taskId) => {
    if (taskId) {
      setTaskIdToDelete(taskId);
    } else {
      setTaskIdToDelete(null);
    }
    setIsOpenDeleteConfirm(isOpenDeleteConfirm => !isOpenDeleteConfirm);
  }, [])
  const handleUpdateTask = useCallback(()=> {
      setIsOpenUpdateTask(isOpenUpdateTask => !isOpenUpdateTask);
  },[])
  
  
  const handleUpdateConfirm = useCallback(()=> {
    setIsOpenUpdateConfirm(isOpenUpdateConfirm => !isOpenUpdateConfirm);
  },[])
  return (
    <>
      <div className="relative flex flex-col">
        <div className={`overlay fixed top-0 right-0 z-20 left-0 bottom-0 bg-black/50
          ${isOpenAddNewTask || isOpenDeleteConfirm || isOpenUpdateTask || isOpenUpdateConfirm
            ? 'opacity-100 transition-all duration-300 ease-in-out'
            : 'opacity-0 transition-all pointer-events-none duration-300 ease-in-out'}
          `}
          onClick={() => {
            if (isOpenAddNewTask) memorizedHandleAddNewTask();
            if (isOpenDeleteConfirm) handleDeleteConfirm();
            if (isOpenUpdateTask) handleUpdateTask();
          }}></div>
        <SideBar handleAddNewTask={memorizedHandleAddNewTask}></SideBar>

        <TasksView handleUpdateTask={handleUpdateTask} handleDeleteConfirm={handleDeleteConfirm} handleToggleCompleted={handleToggleCompleted} todo={todo}></TasksView>
        <TimeLinePanel todo = {todo}></TimeLinePanel>
        <AddNewTaskModal addTasks={addTasks} isOpen={isOpenAddNewTask} handleAddNewTask={memorizedHandleAddNewTask}></AddNewTaskModal>
        <DeleteConfirm deleteTask={deleteTask} taskIdToDelete={taskIdToDelete} isOpenDeleteConfirm={isOpenDeleteConfirm} handleDeleteConfirm={handleDeleteConfirm}></DeleteConfirm>
        <UpdateConfirm handleUpdateConfirm={handleUpdateConfirm} isOpenUpdateConfirm={isOpenUpdateConfirm} handleUpdateTask={handleUpdateTask} ></UpdateConfirm>
        <UpdateTask handleUpdateConfirm={handleUpdateConfirm} isOpenUpdateConfirm={isOpenUpdateTask} handleUpdateTask={handleUpdateTask}></UpdateTask>
      </div>
    </>
  )
}