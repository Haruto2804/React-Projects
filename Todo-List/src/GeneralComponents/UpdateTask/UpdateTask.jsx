/* eslint-disable react-hooks/set-state-in-effect */
import { ModalPriority } from "../AddNewTaskModalComponent/ModalPriority";
import { ModalInput } from "../AddNewTaskModalComponent/ModalInput";
import { UpdateTaskHeader } from "./UpdateTaskHeader";
import { ModalDescription } from "../AddNewTaskModalComponent/ModalDescription";
import { useState, useEffect } from "react";
import { getTaskDateStamp, getTodayStamp } from "../../utils/DateUtils";
import React from 'react'

export const UpdateTask = React.memo(function UpdateTask({ 
  setIsErrorInputOpen, 
  setError, 
  taskToUpdate, 
  setTaskToUpdate, 
  handleUpdateConfirm, 
  isOpenUpdateTask, 
  handleUpdateTask 
}) {
  const [todoName, setTodoName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (taskToUpdate && taskToUpdate.id) {
      setTodoName(taskToUpdate.name || "");
      setDescription(taskToUpdate.description || "");
      setPriority(taskToUpdate.priority || "");
      setDate(taskToUpdate.date || "");
    }
  }, [taskToUpdate]);

  const handleSaveUpdateTask = () => {
    setError(null);
    
    // Validation
    if (todoName.trim() === '' && date.trim() === '') {
      setError('Task Name and Due Date cannot be empty')
      setIsErrorInputOpen(true);
      return false;
    }
    else if (todoName.trim() === '') {
      setError('Task Name cannot be empty');
      setIsErrorInputOpen(true);
      return false;
    } 
    else if (date.trim() === '') {
      setError('Task Due Date cannot be empty');
      setIsErrorInputOpen(true);
      return false;
    }

    const todayStamp = getTodayStamp();
    const taskDateStamp = getTaskDateStamp(date);
    if (taskDateStamp < todayStamp) {
      setError('Task Date cannot be in the past');
      setIsErrorInputOpen(true);
      return false;
    }

    // Tạo object hoàn chỉnh với tất cả thông tin
    const updatedTask = {
      ...taskToUpdate,
      name: todoName,
      description: description,
      priority: priority,
      date: date,
    }

    console.log('Updated task:', updatedTask);
    
    // Cập nhật taskToUpdate
    setTaskToUpdate(updatedTask);
    
    return true;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`
          fixed 
          inset-0 
          bg-black/60 
          backdrop-blur-sm
          z-20
          transition-opacity
          duration-300
          ${isOpenUpdateTask ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={handleUpdateTask}
      />

      {/* Update Task Modal */}
      <div 
        className={`
          z-30
          fixed 
          left-1/2 
          top-1/2 
          -translate-x-1/2 
          -translate-y-1/2
          
          flex 
          flex-col
          
          bg-slate-900
          text-white 
          
          rounded-xl
          sm:rounded-2xl
          
          shadow-2xl
          
          w-[95%]
          max-w-[380px]
          sm:max-w-lg
          md:max-w-xl
          lg:max-w-2xl
          
          max-h-[90vh]
          overflow-y-auto
          
          p-5
          sm:p-6
          md:p-8
          
          ${isOpenUpdateTask 
            ? "opacity-100 scale-100 transition-all duration-300 ease-in-out" 
            : "pointer-events-none opacity-0 scale-95 transition-all duration-300 ease-in-out"
          }
        `}
      >
        <div className="
          flex 
          flex-col 
          gap-6
          sm:gap-8
          md:gap-10
          lg:gap-12
        ">
          {/* Header */}
          <UpdateTaskHeader 
            handleUpdateConfirm={handleUpdateConfirm}
          />
          
          {/* Divider */}
          <hr className="border-t border-gray-700 -mx-2 sm:-mx-0" />
          
          {/* Input Fields */}
          <ModalInput 
            todoName={todoName} 
            setTodoName={setTodoName} 
            date={date} 
            setDate={setDate}
          />
          
          {/* Description */}
          <ModalDescription 
            description={description} 
            setDescription={setDescription}
          />
          
          {/* Priority */}
          <ModalPriority 
            priority={priority} 
            setPriority={setPriority}
          />
          
          {/* Divider */}
          <hr className="border-t border-gray-700 -mx-2 sm:-mx-0" />
          
          {/* Action Buttons */}
          <div className="
            flex 
            flex-col-reverse
            sm:flex-row
            gap-3
            sm:gap-4
            md:gap-5
            sm:self-end
            pt-2
          ">
            {/* Cancel Button */}
            <button
              onClick={handleUpdateTask}
              className="
                w-full
                sm:w-auto
                cursor-pointer 
                hover:bg-slate-600
                active:bg-slate-500
                transition-all 
                duration-200
                text-white
                rounded-lg
                sm:rounded-xl
                bg-slate-700
                
                px-6
                sm:px-8
                
                py-3
                sm:py-2.5
                
                font-semibold
                sm:font-bold
                
                text-sm
                sm:text-base
                
                focus:outline-none
                focus:ring-2
                focus:ring-slate-500
                focus:ring-offset-2
                focus:ring-offset-slate-900
              "
            >
              Cancel
            </button>

            {/* Update Button */}
            <button
              onClick={() => {
                const success = handleSaveUpdateTask();
                if (success) {
                  handleUpdateTask();
                  handleUpdateConfirm();
                }
              }}
              className="
                w-full
                sm:w-auto
                text-white 
                cursor-pointer 
                hover:bg-blue-600
                active:bg-blue-700
                transition-all 
                duration-200
                rounded-lg
                sm:rounded-xl
                bg-blue-500
                
                px-6
                sm:px-8
                
                py-3
                sm:py-2.5
                
                font-semibold
                sm:font-bold
                
                text-sm
                sm:text-base
                
                shadow-lg
                shadow-blue-500/30
                hover:shadow-xl
                hover:shadow-blue-500/40
                
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
                focus:ring-offset-slate-900
              "
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  )
})