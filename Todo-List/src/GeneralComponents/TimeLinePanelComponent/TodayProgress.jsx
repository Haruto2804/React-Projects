export function TodayProgress() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg">Today's Progress</p>
        <div className="flex gap-3 items-center">
          <div className="progress-percent text-xl font-bold">25%</div>
          <div className = "flex flex-col gap-1">
            <p className=" text-xl font-bold">
              1/4 Completed
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