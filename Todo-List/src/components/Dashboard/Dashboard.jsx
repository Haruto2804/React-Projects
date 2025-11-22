import { SideBar } from '../../GeneralComponents/SideBarComponent/SideBar'
import { TimeLinePanel } from '../../GeneralComponents/TimeLinePanelComponent/TimeLinePanel'
import { TasksView } from './TasksView'

export function Dashboard() {
  return (
    <>
      <div className="flex">
        <SideBar></SideBar>
        <TasksView></TasksView>
        <TimeLinePanel></TimeLinePanel>
      </div>
    </>
  )
}