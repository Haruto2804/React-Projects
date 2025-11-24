export function TodayProgress({total, completedTask, percent}) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg">Today's Progress</p>
        <div className="flex gap-3 items-center">
          <div className="progress-percent text-xl font-bold">{percent}%</div>
          <div className = "flex flex-col gap-1">
            <p className=" text-xl font-bold">
              {completedTask}/{total}
            </p>
            <p className="text-gray-500 text-sm">
              Great start!
            </p>
          </div>

        </div>
      </div>
    </>
  )
}