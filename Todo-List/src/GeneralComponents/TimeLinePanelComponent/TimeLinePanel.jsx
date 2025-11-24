import { Calendar } from "./Calendar";
import { UpComingDeadlines } from "./UpComingDeadlines";
import { TodayProgress } from "./TodayProgress";
import React from 'react';
export const TimeLinePanel = React.memo((function TimeLinePanel() {
  console.log('rerender timelinepanel');
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 border-l overflow-auto
      border-gray-200 border-solid flex flex-col gap-4 justify-evenly
      bg-white
      px-3 py-2
      ">
        <Calendar></Calendar>
        <UpComingDeadlines></UpComingDeadlines>
        <TodayProgress></TodayProgress>
      </div>

    </>
  )
}))