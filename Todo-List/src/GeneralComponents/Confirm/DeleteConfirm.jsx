import { BsTrash3 } from "react-icons/bs";
export function DeleteConfirm({ isOpenDeleteConfirm, handleDeleteConfirm }) {
  return (
    <>
      <div className={`
      z-1
      flex 
      flex-col 
      bg-gray-800 
      text-white 
      p-12 
      gap-5 
      items-center 
      fixed 
      left-1/2 
      top-1/2 
      -translate-x-1/2 
      -translate-y-1/2 
      rounded-sm
      ${isOpenDeleteConfirm ? "opacity-100 scale-100 transition-all duration-300 ease-in-out" : "opacity-0 scale-100 transition-all duration-300 ease-in-out"}
      `}>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
          <span className="material-symbols-outlined text-3xl text-red-500 dark:text-red-400">delete</span>
        </div>
        <p className="text-2xl font-bold">Are you sure want to delete this task?</p>
        <p className="text-lg text-gray-400 font-bold">This action is permanent and cannot be undone.</p>
        <div className="flex w-full gap-5">
          <button 
          onClick = {handleDeleteConfirm}
          className="font-bold flex-1 px-10 w-full py-3 rounded-lg bg-slate-700 cursor-pointer hover:bg-white/30 transition-all">Cancel</button>
          <button
            onClick={handleDeleteConfirm}
            className={`font-bold 
          flex-1 
          px-10 
          py-3 
          rounded-lg 
          bg-red-700 
          cursor-pointer 
          hover:bg-red-500 
          transition-all`

            }>Delete</button>
        </div>
      </div>
    </>
  )
}