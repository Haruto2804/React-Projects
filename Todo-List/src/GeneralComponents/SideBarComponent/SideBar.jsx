import HarutoPicture from '../../image/haruto-picture.png'
import { HiOutlineInbox } from "react-icons/hi2";
import { IoTodayOutline, IoPerson } from "react-icons/io5";
import { MdOutlineUpcoming, MdOutlineWorkHistory } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { NavLink, Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";

import React from 'react'
export const SideBar = React.memo(function SideBar({ handleAddNewTask }) {
  const getNavLinkClass = ({ isActive }) =>
    `flex gap-4 p-3 items-center cursor-pointer rounded-lg transition-colors
        ${isActive
      ? 'bg-blue-100 text-blue-700 font-semibold'
      : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <nav className="select-none 
    fixed top-0 left-0 bottom-0 
    flex 
    flex-col 
    gap-5 
    border-r 
    border-solid 
    border-gray-200 
    p-5 
    z-30
    bg-white
  max-sm:bottom-0  
  max-sm:left-0         
  max-sm:right-0        
  max-sm:top-auto       
  max-sm:flex-col-reverse   
  max-sm:border-t       
  max-sm:border-r-0   
  max-sm:p-2
    ">

      {/* User Section (Link về Trang chủ) */}
      <div className="user-section 
  flex 
  items-center 
  gap-3       // Tăng khoảng cách giữa ảnh và chữ từ gap-2 lên gap-3
  p-3         // Tăng padding xung quanh
  rounded-xl  // Bo tròn góc cho toàn bộ section
  bg-gray-50  // Thêm màu nền nhẹ để nổi bật (hoặc bg-white nếu không muốn nền)
  border 
  border-gray-200 
  shadow-sm

  // --- Mobile Fixed Header (Giữ nguyên logic của bạn) ---
  max-sm:fixed 
  z-30 
  max-sm:top-0 
  max-sm:left-0 
  max-sm:right-0 
  max-sm:bg-white 
  max-sm:p-3
  max-sm:border-b 
  max-sm:border-t-0
  max-sm:rounded-none // Bỏ bo tròn trên mobile khi cố định
">
        <img
          src={HarutoPicture}
          alt="Ảnh đại diện Haruto"
          className="
        size-12         // Tăng kích thước ảnh từ size-10 lên size-12
        rounded-full 
        object-cover    // Đảm bảo ảnh luôn đầy đủ và không bị méo
        ring-2          // Thêm một vòng ring nhẹ
        ring-blue-400
      "
        />

        <div className="user-details">
          <p className="
          text-gray-800   // Màu chữ đậm hơn
          text-lg 
          font-bold       // Tên người dùng nên là Bold
          truncate        // Giúp tên không tràn ra ngoài
        ">
            Haruto Love React
          </p>
          <p className="
          text-gray-500 
          text-sm 
          font-normal     // Giảm độ đậm của email
        ">
            haruto2804@gmail.com
          </p>
        </div>
      </div>

      {/* Button Add new task */}
      <button
        onClick={handleAddNewTask}
        className="bg-blue-600 text-white font-bold rounded-lg cursor-pointer w-full h-12 hover:bg-blue-700 transition-all hover:-translate-y-1"
      >
        Add new task
      </button>

      {/* --- TASKS SECTION --- */}
      <div className="feature-section flex flex-col gap-1   // Đảm bảo không còn viền phải
      max-sm:flex-row max-sm:justify-between
      ">
        <NavLink to="/" className={getNavLinkClass}>
          <IoHomeOutline className="size-5" />
          <p className="max-sm:hidden">Home</p>
        </NavLink>
        <NavLink to="/tasks/all" className={getNavLinkClass}>
          <HiOutlineInbox className="size-5" />
          <p className="max-sm:hidden">All Tasks</p>
        </NavLink>

        <NavLink to="/tasks/today" className={getNavLinkClass}>
          <IoTodayOutline className="size-5" />
          <p className="max-sm:hidden">Today</p>
        </NavLink>

        <NavLink to="/tasks/upcoming" className={getNavLinkClass}>
          <MdOutlineUpcoming className="size-5" />
          <p className="max-sm:hidden">Upcoming</p>
        </NavLink>

        <NavLink to="/tasks/completed" className={getNavLinkClass}>
          <FaRegCheckCircle className="size-5" />
          <p className="max-sm:hidden">Completed</p>
        </NavLink>
      </div>

      {/* --- PROJECTS SECTION --- */}
      <div className="projects-section flex flex-col gap-1 border-t-2 border-gray-200 max-sm:hidden">
        <p className="font-semibold font-sm text-gray-600 mt-5">PROJECTS</p>

        {/* Dùng NavLink và Dynamic Route /projects/:projectId */}
        <NavLink to="/projects/work" className={getNavLinkClass}>
          <MdOutlineWorkHistory className="size-5" />
          <p className="max-sm:hidden">Work</p>
        </NavLink>

        <NavLink to="/projects/personal" className={getNavLinkClass}>
          <IoPerson className="size-5" />
          <p className="max-sm:hidden">Personal</p>
        </NavLink>

        <NavLink to="/projects/phoenix" className={getNavLinkClass}>
          <GoProjectRoadmap className="size-5" />
          <p className="max-sm:hidden">Work Phoenix</p>
        </NavLink>
      </div>
    </nav>
  );
})