import { SideBar } from '../../GeneralComponents/SideBarComponent/SideBar'
import { TimeLinePanel } from '../../GeneralComponents/TimeLinePanelComponent/TimeLinePanel'
import { AddNewTaskModal } from '../../GeneralComponents/AddNewTaskModalComponent/AddNewTaskModal'
import { TasksView } from '../Tasks/TasksView'
import { useState } from 'react'
import { DeleteConfirm } from '../../GeneralComponents/Confirm/DeleteConfirm'
export function HomePage({handleToggleCompleted, addTasks, todo}) {
  let [isOpenAddNewTask,setIsOpenAddNewTask] = useState(false);
  let [isOpenDeleteConfirm,setIsOpenDeleteConfirm] = useState(false);
  function handleAddNewTask() {
    setIsOpenAddNewTask(isOpen => !isOpen);
  }
    function handleDeleteConfirm() {
      console.log('hello')
    setIsOpenDeleteConfirm(isOpenDeleteConfirm => !isOpenDeleteConfirm);
  }
  return (
    <>
      <div className="relative flex flex-col">
        <div className={`overlay fixed top-0 right-0 z-1 left-0 bottom-0 bg-black/50
          ${isOpenAddNewTask || isOpenDeleteConfirm
            ? 'opacity-100 transition-all duration-300 ease-in-out'
            : 'opacity-0 transition-all pointer-events-none duration-300 ease-in-out'}
          `}></div>
        <SideBar handleAddNewTask={handleAddNewTask}></SideBar>

        <TasksView handleDeleteConfirm = {handleDeleteConfirm} handleToggleCompleted = {handleToggleCompleted} todo = {todo}></TasksView>
        <TimeLinePanel></TimeLinePanel>
        <AddNewTaskModal addTasks = {addTasks} isOpen={isOpenAddNewTask} handleAddNewTask={handleAddNewTask}></AddNewTaskModal>
        <DeleteConfirm isOpenDeleteConfirm = {isOpenDeleteConfirm} handleDeleteConfirm = {handleDeleteConfirm}></DeleteConfirm>
      </div>
    </>
  )
}