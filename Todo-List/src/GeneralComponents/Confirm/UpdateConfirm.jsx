import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'

export const UpdateConfirm = React.memo(function UpdateConfirm({ 
  updateTask, 
  taskToUpdate, 
  handleUpdateConfirm, 
  isOpenUpdateConfirm, 
  handleUpdateTask 
}) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`
          fixed 
          inset-0 
          bg-black/60 
          backdrop-blur-sm
          z-40
          transition-opacity
          duration-300
          ${isOpenUpdateConfirm ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={handleUpdateConfirm}
      />

      {/* Update Confirmation Modal */}
      <div 
        className={`
          z-50
          fixed 
          left-1/2 
          top-1/2 
          -translate-x-1/2 
          -translate-y-1/2
          
          flex 
          flex-col 
          items-center 
          gap-4
          sm:gap-5
          md:gap-6
          
          bg-gray-800 
          text-white 
          
          rounded-xl
          sm:rounded-2xl
          
          shadow-2xl
          
          w-[90%]
          max-w-[360px]
          sm:max-w-md
          md:max-w-lg
          
          p-6
          sm:p-8
          md:p-10
          
          ${isOpenUpdateConfirm 
            ? "opacity-100 scale-100 transition-all duration-300 ease-in-out" 
            : "pointer-events-none opacity-0 scale-95 transition-all duration-300 ease-in-out"
          }
        `}
      >
        {/* Icon Container */}
        <div className="
          flex 
          items-center 
          justify-center 
          rounded-full 
          bg-blue-100 
          dark:bg-blue-900/30
          
          size-14
          sm:size-16
          md:size-20
          
          shadow-lg
          shadow-blue-500/20
          
          animate-pulse
        ">
          <FiCheckCircle className="
            size-7
            sm:size-8
            md:size-10
            text-blue-500
            dark:text-blue-400
          " />
        </div>

        {/* Title */}
        <h2 className="
          text-lg
          sm:text-xl
          md:text-2xl
          font-bold 
          text-center
          leading-tight
        ">
          Are you sure you want to update this task?
        </h2>

        {/* Warning Message */}
        <p className="
          text-sm
          sm:text-base
          md:text-lg
          text-gray-400 
          text-center
          leading-relaxed
        ">
          This action will save your changes permanently.
        </p>

        {/* Action Buttons */}
        <div className="
          flex 
          flex-col-reverse
          sm:flex-row
          w-full 
          gap-3
          sm:gap-4
          md:gap-5
          pt-2
        ">
          {/* Cancel Button */}
          <button
            onClick={() => {
              handleUpdateConfirm();
              handleUpdateTask();
            }}
            className="
              font-semibold
              sm:font-bold
              flex-1 
              w-full 
              
              px-6
              sm:px-8
              md:px-10
              
              py-3
              sm:py-3.5
              
              rounded-lg
              sm:rounded-xl
              
              bg-slate-700 
              hover:bg-slate-600
              active:bg-slate-500
              
              cursor-pointer 
              
              transition-all
              duration-200
              
              focus:outline-none
              focus:ring-2
              focus:ring-slate-500
              focus:ring-offset-2
              focus:ring-offset-gray-800
              
              text-sm
              sm:text-base
            "
          >
            Cancel
          </button>

          {/* Update Button */}
          <button
            onClick={() => {
              updateTask(taskToUpdate);
              handleUpdateConfirm();
            }}
            className="
              font-semibold
              sm:font-bold
              flex-1 
              w-full
              
              px-6
              sm:px-8
              md:px-10
              
              py-3
              sm:py-3.5
              
              rounded-lg
              sm:rounded-xl
              
              bg-blue-600
              hover:bg-blue-700
              active:bg-blue-800
              
              cursor-pointer 
              
              transition-all
              duration-200
              
              hover:shadow-lg
              hover:shadow-blue-500/30
              hover:-translate-y-0.5
              
              active:translate-y-0
              
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              focus:ring-offset-gray-800
              
              text-sm
              sm:text-base
            "
          >
            Update
          </button>
        </div>
      </div>
    </>
  )
})