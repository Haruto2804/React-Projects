export function TasksView() {
  const currentTime = new Date();
  const dateString = currentTime.toLocaleString('default', {
    weekday: 'long',
    month: 'long',
    day: '2-digit'
  });
  return (
    <>
      <div className="ml-[258px] mr-[325px] w-full p-8 flex flex-col gap-5 overflow-auto">
        <div className="">
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold">Today's Task</p>
            <p className="text-gray-500 text-lg">{dateString}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between border-solid border
          border-gray-200 rounded-lg cursor-pointer hover:bg-slate-200 transition-all
          p-4">
            <div className="flex gap-4 items-center">
              <input type="checkbox" className="size-5 rounded cursor-pointer" />
              <p className="">Finalize Q4 marketing report</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className=" text-red-500 font-semibold rounded-full bg-red-100 text-sm px-3 py-1" >
                High Priority
              </div>
              <p className="text-gray-500">Today</p>
            </div>
            

          </div>
          

        </div>
  <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between border-solid border
          border-gray-200 rounded-lg cursor-pointer hover:bg-slate-200 transition-all
          p-4">
            <div className="flex gap-4 items-center">
              <input type="checkbox" className="size-5 rounded cursor-pointer" />
              <p className="">Finalize Q4 marketing report</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className=" text-red-500 font-semibold rounded-full bg-red-100 text-sm px-3 py-1" >
                High Priority
              </div>
              <p className="text-gray-500">Today</p>
            </div>
            

          </div>
          

        </div>
      </div>

    </>
  )
}