import { FaAnglesRight } from "react-icons/fa6";
export function UpComingDeadlines() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg">Upcoming Deadlines</p>

        <div className="flex gap-4 items-center cursor-pointer hover:bg-blue-100 rounded-lg
                  ">
          <FaAnglesRight className="size-5" />
          <div>
            <p>Submit Q4 expense reports</p>
            <p className="text-gray-400 text-sm font-medium">Due in 2 days</p>
          </div>

        </div>
        <div className="flex gap-4 items-center cursor-pointer hover:bg-blue-100 rounded-lg
                  ">
          <FaAnglesRight className="size-5" />
          <div>
            <p>Submit Q4 expense reports</p>
            <p className="text-gray-400 text-sm font-medium">Due in 2 days</p>
          </div>

        </div>
        




      </div>
    </>
  )
}