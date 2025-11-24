import { SideBar } from '../../GeneralComponents/SideBarComponent/SideBar'
import { TimeLinePanel } from '../../GeneralComponents/TimeLinePanelComponent/TimeLinePanel'
import { AddNewTaskModal } from '../../GeneralComponents/AddNewTaskModalComponent/AddNewTaskModal'
import { TasksView } from '../Tasks/TasksView'
import { useState } from 'react'
import { DeleteConfirm } from '../../GeneralComponents/Confirm/DeleteConfirm'
import { UpdateConfirm } from '../../GeneralComponents/Confirm/UpdateConfirm'
import { UpdateTask } from '../../GeneralComponents/UpdateTask/UpdateTask'
export function HomePage({ handleToggleCompleted, addTasks, todo }) {
  const [isOpenAddNewTask, setIsOpenAddNewTask] = useState(false);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);
  const [isOpenUpdateTask, setIsOpenUpdateTask] = useState(false);
  const [isOpenUpdateConfirm, setIsOpenUpdateConfirm] = useState(false);
  function handleAddNewTask() {
    setIsOpenAddNewTask(isOpen => !isOpen);
  }
  function handleDeleteConfirm() {
    setIsOpenDeleteConfirm(isOpenDeleteConfirm => !isOpenDeleteConfirm);
  }
  function handleUpdateTask() {
    setIsOpenUpdateTask(isOpenUpdateTask => !isOpenUpdateTask);
  }
  function handleUpdateConfirm() {
    setIsOpenUpdateConfirm(isOpenUpdateConfirm => !isOpenUpdateConfirm);
  }
  return (
    <>
      <div className="relative flex flex-col">
        <div className={`overlay fixed top-0 right-0 z-20 left-0 bottom-0 bg-black/50
          ${isOpenAddNewTask || isOpenDeleteConfirm || isOpenUpdateTask || isOpenUpdateConfirm
            ? 'opacity-100 transition-all duration-300 ease-in-out'
            : 'opacity-0 transition-all pointer-events-none duration-300 ease-in-out'}
          `}
          onClick={() => {
            if (isOpenAddNewTask) handleAddNewTask();
            if (isOpenDeleteConfirm) handleDeleteConfirm();
            if (isOpenUpdateTask) handleUpdateTask();
          }}></div>
        <SideBar handleAddNewTask={handleAddNewTask}></SideBar>

        <TasksView handleUpdateTask={handleUpdateTask} handleDeleteConfirm={handleDeleteConfirm} handleToggleCompleted={handleToggleCompleted} todo={todo}></TasksView>
        <TimeLinePanel></TimeLinePanel>
        <AddNewTaskModal addTasks={addTasks} isOpen={isOpenAddNewTask} handleAddNewTask={handleAddNewTask}></AddNewTaskModal>
        <DeleteConfirm isOpenDeleteConfirm={isOpenDeleteConfirm} handleDeleteConfirm={handleDeleteConfirm}></DeleteConfirm>
        <UpdateConfirm handleUpdateConfirm={handleUpdateConfirm} isOpenUpdateConfirm={isOpenUpdateConfirm} handleUpdateTask = {handleUpdateTask} ></UpdateConfirm>
        <UpdateTask handleUpdateConfirm={handleUpdateConfirm} isOpenUpdateConfirm={isOpenUpdateTask} handleUpdateTask={handleUpdateTask}></UpdateTask>
      </div>
    </>
  )
}