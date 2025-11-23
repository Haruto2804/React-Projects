import { useLocation } from 'react-router-dom'
export function TasksView({ handleToggleCompleted, todo }) {
  console.log(todo);
  const location = useLocation();
  const currentView = location.pathname.split('/').pop();
  const tasksToDisplay = todo || [];
  const getTodayStart = () => {
    const now = new Date();
    // Đặt giờ, phút, giây, mili-giây về 00:00:00.000
    now.setHours(0, 0, 0, 0);
    // Trả về mốc thời gian Unix (số mili-giây từ 1970)
    return now.getTime();
  };
  const todayTimestamp = getTodayStart();
  const getTaskDateStart = (dateInput) => {
    if (!dateInput) return null;
    const taskDate = new Date(dateInput);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime();
  };
  let filteredTasks = [];
  switch (currentView) {
    case 'completed':
      filteredTasks = tasksToDisplay.filter(task => task.completed === true);
      break;
    case 'upcoming':
      filteredTasks = tasksToDisplay.filter(task => {
        const taskTimestamp = getTaskDateStart(task.date);
        // Công việc chưa hoàn thành VÀ ngày đến hạn là trong tương lai (> ngày hôm nay)
        return task.completed === false && taskTimestamp !== null && taskTimestamp > todayTimestamp;
      });
      break;
    case 'today':
      filteredTasks = tasksToDisplay.filter(task => {
        const taskTimestamp = getTaskDateStart(task.date);

        return taskTimestamp === todayTimestamp;
      });
      break;
    default:
      filteredTasks = tasksToDisplay;
      break;

  }
  const currentTime = new Date();
  const dateString = currentTime.toLocaleString('default', {
    weekday: 'long',
    month: 'long',
    day: '2-digit'
  });

  return (
    <>
      <div className="ml-[258px] mr-80 flex-1 p-8 flex flex-col gap-5 overflow-y-auto">
        <div className="">
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold">{currentView === "completed" ?
              "Completed's Tasks" : currentView === "upcoming" ? "Upcoming's Tasks"
                : currentView === "today" ? "Today's Tasks" : "All Tasks"
            }</p>
            <p className="text-gray-500 text-lg">{dateString}</p>
          </div>
        </div>
        <div className="grid grid-cols-[auto,1fr,auto,auto,auto] border rounded-sm gap-5 border-gray-200">
          <div className="col-span-5 grid grid-cols-subgrid font-semibold h-10 items-center border-b border-gray-200 bg-slate-50 p-2">
            <input type="checkbox" className="size-5" />
            <p className="">Task Title</p>
            <p>Due Date</p>
            <p>Priority</p>
            <p>Action</p>
          </div>
          {filteredTasks.map((task) => {
            return (
              <div key={task.id} className=" cursor-pointer hover:bg-slate-100 transition-all col-span-5 grid grid-cols-subgrid items-center border-b border-gray-200 p-2">
                <input disable = {task.completed} type="checkbox" className="size-5 cursor-pointer" />
                <p className = {task.completed === true ? "line-through opacity-30" :""}>{task.todo}</p>
                <p className = {task.completed === true ? "line-through opacity-30" :""}>{task.date}</p>
                <p className={task.priority === "High" ? " text-red-800 bg-red-200 font-medium rounded-xl text-center p-2 " :
                  task.priority === "Medium" ? "text-yellow-800 bg-yellow-200 font-medium rounded-xl text-center p-2" :
                    task.priority === "Low" ? "text-gray-800 bg-gray-200 font-medium rounded-xl text-center p-2"
                      :  "text-green-800 bg-green-200 font-medium rounded-xl text-center p-2"

                }>{task.priority}</p>
                <div className="flex flex-col opacity-0 hover:opacity-100">
                  <p>Update</p>
                  <p>Delete</p>
                </div>
              </div>
            )
          })}

        </div>
      </div >

    </>
  )
}