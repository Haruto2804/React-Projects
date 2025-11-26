import { IoMdClose } from "react-icons/io";
export function UpdateTaskHeader({handleUpdateConfirm}) {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <p className="text-3xl font-bold text-white ">Update Task</p>
        <button onClick = {handleUpdateConfirm}>
          <IoMdClose className="size-6 cursor-pointer" />
        </button>

      </div>
    </>
  )
}