import { ModalHeader } from './ModalHeader'
import { ModalInput } from './ModalInput'
import { ModalPriority } from './ModalPriority'
import { ModalDescription } from './ModalDescription'
import { useCallback, useState } from 'react'
import React from 'react'
import { getTaskDateStamp, getTodayStamp } from '../../utils/DateUtils'

export const AddNewTaskModal = React.memo(function AddNewTaskModal({ 
  setIsErrorInputOpen, 
  setError, 
  addTasks, 
  isOpen, 
  handleAddNewTask 
}) {
  const [todoName, setTodoName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  
  const currentDate = new Date();
  const defaultDateString = currentDate.toISOString().split('T')[0];
  
  const handleSaveTodo = useCallback(() => {
    setError(null);
    
    if (todoName.trim() === '' && date.trim() === '') {
      setError('Task Name and Due Date cannot be empty')
      setIsErrorInputOpen(true);
      return;
    } else if (todoName.trim() === '') {
      setError('Task Name cannot be empty');
      setIsErrorInputOpen(true);
      return;
    } else if (date.trim() === '') {
      setError('Task Due Date cannot be empty');
      setIsErrorInputOpen(true);
      return;
    }
    
    const todayStamp = getTodayStamp();
    const taskDateStamp = getTaskDateStamp(date);
    
    if (taskDateStamp < todayStamp) {
      setError('Task Date cannot be in the past');
      setIsErrorInputOpen(true);
      return;
    }
    
    const newTaskData = {
      name: todoName,
      completed: false,
      userId: crypto.randomUUID(),
      priority: priority || 'Medium',
      date: date || defaultDateString,
      isDeleted: false,
      description: description,
      id: crypto.randomUUID(),
    }
    
    addTasks(newTaskData);
    handleAddNewTask();
  }, [addTasks, date, defaultDateString, description, handleAddNewTask, priority, setError, setIsErrorInputOpen, todoName])

  const modalClasses = `
    fixed 
    inset-0
    z-30
    flex
    items-center
    justify-center
    p-4
    sm:p-6
    md:p-8
    
    ${isOpen 
      ? 'opacity-100 scale-100 transition-all duration-300 ease-in-out' 
      : 'opacity-0 scale-95 pointer-events-none transition-all duration-300 ease-in-out'
    }
  `;

  const modalContentClasses = `
    bg-white 
    rounded-xl 
    shadow-2xl
    w-full
    max-w-full
    sm:max-w-lg
    md:max-w-xl
    lg:max-w-2xl
    max-h-[90vh]
    overflow-y-auto
    
    flex 
    flex-col 
    gap-4
    sm:gap-5
    md:gap-6
    
    p-5
    sm:p-6
    md:p-8
  `;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`
          fixed 
          inset-0 
          bg-black/50 
          backdrop-blur-sm
          z-20
          transition-opacity
          duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={handleAddNewTask}
      />

      {/* Modal */}
      <div className={modalClasses}>
        <div className={`${modalContentClasses} select-none`}>
          {/* Header */}
          <ModalHeader 
            header="Add new task" 
            subtitle="Fill in the details below to add a new task."
          />
          
          {/* Divider */}
          <hr className="border-t border-gray-200 -mx-2 sm:-mx-0" />
          
          {/* Input Fields */}
          <ModalInput 
            setTodoName={setTodoName} 
            setDate={setDate} 
            defaultDateString={defaultDateString}
          />
          
          {/* Priority Selection */}
          <ModalPriority setPriority={setPriority} />
          
          {/* Divider */}
          <hr className="border-t border-gray-200 -mx-2 sm:-mx-0" />
          
          {/* Description */}
          <ModalDescription setDescription={setDescription} />
          
          {/* Action Buttons */}
          <div className="
            flex 
            flex-col-reverse
            sm:flex-row
            gap-3
            sm:gap-4
            sm:justify-end
            pt-2
          ">
            <button 
              onClick={handleAddNewTask}
              className="
                w-full
                sm:w-auto
                cursor-pointer 
                hover:bg-slate-300 
                active:bg-slate-400
                transition-all 
                duration-200
                text-gray-700
                rounded-lg  
                bg-slate-200 
                px-6 
                py-3
                sm:py-2.5
                font-semibold
                text-sm
                sm:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-slate-400
                focus:ring-offset-2
              "
            >
              Cancel
            </button>
            
            <button 
              onClick={handleSaveTodo}
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
                bg-blue-500 
                px-6 
                py-3
                sm:py-2.5
                font-semibold
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
              "
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </>
  )
})