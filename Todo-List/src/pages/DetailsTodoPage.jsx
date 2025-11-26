import { IoArrowBackSharp } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { useParams } from "react-router-dom";
export function DetailsTodoPage({ todo }) {
  const { taskId } = useParams();
  const foundTask = todo.find((task) => task.id === taskId);
  if (foundTask === null) {
    console.log('Không tìm thấy task cần tìm');
  }

  console.log("Task ID:", taskId);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <main className="w-full max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Chi tiết công việc</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Xem thông tin chi tiết và quản lý công việc của bạn.</p>
          </div>
          <div className="bg-white shadow-sm rounded-lg border border-slate-200">
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <label className="text-xl font-medium text-gray-500 ">Tên công việc</label>
                  <p className="mt-1 text-3xl font-semibold ">{foundTask.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Ngày hết hạn</label>
                  <p className="mt-1">{foundTask.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Độ ưu tiên</label>
                  <div className="mt-1">
                    <span className="items-center px-5 py-1 select-none rounded-lg text-lg font-medium bg-red-100  text-red-800 ">
                      {foundTask.priority}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 ">Trạng thái hoàn thành</label>
                  <div className="mt-1 flex items-center gap-2 text-red-600 dark:text-red-400">
                    <IoMdCloseCircle classNameName="size-5"></IoMdCloseCircle>
                    <span className="font-medium">foundTask.completed</span>
                  </div>
                </div>
                <div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500 ">Description</label>
                  <p className="mt-1 ">
                    {foundTask.description}
                  </p>
                </div>
                <div className="md:col-span-2 border-t border-slate-200 dark:border-slate-700 my-2"></div>
                <div>
                  <label className="text-sm font-medium text-gray-500 ">ID Task</label>
                  <p className="mt-1 font-mono text-sm ">{foundTask.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium ">ID User</label>
                  <p className="mt-1 font-mono text-sm  ">usr_9f4b1a8c-2e7d-4b0f-8c6a-5e1d3f9b2c7e</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-500  border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row-reverse items-center gap-3 rounded-b-lg">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary rounded shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-colors duration-200" type="button">
                <FaPen classNameName="size-5"></FaPen>
                Update
              </button>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-100/50 dark:bg-red-900/30 rounded shadow-sm hover:bg-red-100 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-colors duration-200" type="button">
                <IoTrashOutline classNameName="size-5"></IoTrashOutline>
                Delete
              </button>
              <a className="w-full sm:w-auto sm:mr-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 rounded shadow-sm border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-colors duration-200" href="#">
                <IoArrowBackSharp classNameName="size-5"></IoArrowBackSharp>
                Back
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}