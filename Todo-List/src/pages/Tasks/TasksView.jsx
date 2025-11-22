import { useLocation } from 'react-router-dom'
export function TasksView({ todo }) {
  const location = useLocation();
  const currentView = location.pathname.split('/').pop();
  const tasksToDisplay = todo || [];
  let filteredTasks = [];
  switch (currentView) {
    case 'completed':
      filteredTasks = tasksToDisplay.filter(task => task.completed === true);
      break;
    case 'upcoming':
      filteredTasks = tasksToDisplay.filter(task => task.completed === false);
      break;
    default:
      filteredTasks = tasksToDisplay;
      break;

  }
  console.log(currentView);
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
            <p className="text-3xl font-bold">Today's Task</p>
            <p className="text-gray-500 text-lg">{dateString}</p>
          </div>
        </div>
        {filteredTasks.map((task) => (
          <div key={task.id} className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between border-solid border
          border-gray-200 rounded-lg cursor-pointer hover:bg-slate-200 transition-all
          p-4">
              <div className="flex gap-4 items-center ">
                <input disabled={task.completed} type="checkbox" className={` size-5 rounded cursor-pointer`} />
                <p className={task.completed ? "line-through opacity-70" : ""}>{task.todo}</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className={

                  `
                  
                ${task.priority === 'High' ? "text-red-500 bg-red-100"
                    : task.priority === 'Medium' ? "text-yellow-700 bg-yellow-100"
                      : task.priority === "Low" ? "text-gray-700 bg-gray-200"
                        : "text-green-700 bg-green-200"
                  }
                font-semibold 
                rounded-full 
                text-sm 
                px-3 
                py-1`}>
                  {task.priority}
                </div>
                <p className="text-gray-500">Today</p>
              </div>
            </div>


          </div>

        ))}

      </div>

    </>
  )
}