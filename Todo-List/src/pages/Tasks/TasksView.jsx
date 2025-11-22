
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
        <h1 className = "text-5xl">Welcome to my website</h1>
      </div>

    </>
  )
}