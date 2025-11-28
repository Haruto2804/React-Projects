import { GrLinkPrevious, GrLinkNext } from "react-icons/gr"; // Import thêm GrLinkNext để làm icon mở rộng
import HarutoPicture from '../../image/haruto-picture.png'
import { HiOutlineInbox } from "react-icons/hi2";
import { IoTodayOutline, IoPerson, IoHomeOutline } from "react-icons/io5";
import { MdOutlineUpcoming, MdOutlineWorkHistory } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { NavLink, Link } from 'react-router-dom';

import React, { useState } from 'react'

// Đặt độ rộng cho trạng thái mở và đóng
const SIDEBAR_WIDTH_FULL = 'w-64'; // Độ rộng khi mở
const SIDEBAR_WIDTH_COLLAPSED = 'w-20'; // Độ rộng khi đóng (chỉ chứa icon)

export const SideBar = React.memo(function SideBar({ handleAddNewTask }) {
  // Thay đổi: Mặc định là MỞ (true)
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);

  // Hàm toggle Sidebar
  const toggleSideBar = () => {
    setIsOpenSideBar(prev => !prev);
  };

  const getNavLinkClass = ({ isActive }) =>
    `flex gap-4 p-3 items-center cursor-pointer rounded-lg transition-colors duration-300
        ${isActive
      ? 'bg-blue-100 text-blue-700 font-semibold'
      : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <nav className={`select-none 
      fixed top-0 left-0 bottom-0 
      flex 
      flex-col 
      gap-5 
      border-r 
      border-solid 
      border-gray-200 
      p-3 
      z-30
      bg-white
      transition-all duration-300 ${isOpenSideBar ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_COLLAPSED}

      /* Mobile styles (giữ nguyên logic menu ngang ở dưới) */
      max-sm:bottom-0 
      max-sm:left-0 
      max-sm:right-0 
      max-sm:top-auto  
      max-sm:flex-row max-sm:justify-between max-sm:items-center   
      max-sm:border-t 
      max-sm:border-r-0 
      max-sm:p-2
      max-sm:w-full
      max-lg: items-center
    `}>

      {/* User Section (Link về Trang chủ) - Ẩn khi thu gọn trên Desktop/Tablet */}
      <div className={`
      
        user-section 
        flex 
        items-center 
        gap-3 
        p-3 
        rounded-xl
        bg-gray-50
        border 
        border-gray-200 
        shadow-sm
        transition-opacity duration-300
        ${isOpenSideBar ? 'opacity-100' : 'opacity-0 h-0 p-0 overflow-hidden'} /* Ẩn/hiện nội dung */

        /* Mobile Fixed Header (Luôn hiển thị trên Mobile) */
        max-sm:fixed 
        z-30 
        max-sm:top-0 
        max-sm:left-0 
        max-sm:right-0 
        max-sm:bg-white 
        max-sm:p-3
        max-sm:border-b 
        max-sm:border-t-0
        max-sm:rounded-none
        max-sm:opacity-100 max-sm:h-auto max-sm:flex-row

      `}>
        <img
          src={HarutoPicture}
          alt="Ảnh đại diện Haruto"
          className="
            size-12
            rounded-full 
            object-cover
            ring-2
            ring-blue-400
          "
        />

        <div className="user-details max-sm:block">
          {/* 2. Ẩn nội dung chi tiết khi thu gọn (chỉ trên desktop/tablet) */}
          <p className={`
            text-gray-800
            text-sm
            font-bold
            truncate

            ${isOpenSideBar ? 'max-lg:hidden' : 'max-lg:hidden'}
            
            /* Dùng chung lớp ẩn/hiện cho cả nội dung */
            ${isOpenSideBar ? 'block' : 'hidden lg:block'} 
            max-sm:block /* Luôn hiện trên mobile */
          `}>
            Haruto Love React
          </p>
          <p className={`
            text-gray-500 
            text-xs
            font-normal
            ${isOpenSideBar ? 'max-lg:hidden' : 'max-lg:hidden'}

            /* Dùng chung lớp ẩn/hiện cho cả nội dung */
            ${isOpenSideBar ? 'block' : 'hidden lg:block'} 
            max-sm:block /* Luôn hiện trên mobile */
          `}>
            haruto2804@gmail.com
          </p>
        </div>
      </div>

      {/* 3. Button Toggle Sidebar - Cố định vị trí và logic */}
      <button
        onClick={toggleSideBar}
        className="
          flex items-center gap-2 p-2 
          cursor-pointer rounded-lg text-gray-700 
          hover:bg-gray-100 transition-colors 
          self-start w-full
          max-sm:hidden 
          max-lg:gap-0 max-lg:justify-center
        "
      >
        {/* Thay đổi icon tùy thuộc trạng thái */}
        {isOpenSideBar ?
          <GrLinkPrevious className="size-5" /> :
          <GrLinkNext className="size-5" />
        }
        {/* Ẩn chữ khi thu gọn */}
        {isOpenSideBar && <p className="font-medium">Thu gọn</p>}
      </button>

      {/* Button Add new task */}
      <div className = "max-sm: max-sm:flex max-sm: flex-col-reverse max-sm:w-full max-sm:gap-5 w-full">
        <button
          onClick={handleAddNewTask}
          // Thay đổi: Áp dụng kích thước w-full khi mở, và icon-only khi đóng
          className={`
          bg-blue-600 text-white font-bold rounded-lg cursor-pointer h-12 
          hover:bg-blue-700 transition-all hover:shadow-lg
          lg:mb-5
          ${isOpenSideBar ? 'w-full px-4' : 'w-12 mx-auto'}
        `}
        >
          {/* 4. Chỉ hiển thị chữ khi mở, hoặc icon khi đóng (ví dụ: +) */}
          {isOpenSideBar ? 'Add new task' : '+'}
        </button>

        {/* --- TASKS SECTION --- */}
        <div className="feature-section flex flex-col gap-1 
        max-sm:flex-row max-sm:justify-between max-sm:w-full max-sm:flex-1
        max-lg:gap-5 
      ">
          {/* Điều chỉnh NavLink: luôn căn giữa text và icon khi thu gọn */}
          <NavLink to="/" className={getNavLinkClass}>
            <IoHomeOutline className="size-5" />
            {/* 5. Ẩn chữ khi Sidebar thu gọn (trên desktop) */}
            <p className={`${isOpenSideBar ? 'block' : 'hidden max-lg:block'} max-sm:hidden`}>Home</p>
          </NavLink>
          <NavLink to="/tasks/all" className={getNavLinkClass}>
            <HiOutlineInbox className="size-5" />
            <p className={`${isOpenSideBar ? 'block' : 'hidden max-lg:block'} max-sm:hidden`}>All Tasks</p>
          </NavLink>

          <NavLink to="/tasks/today" className={getNavLinkClass}>
            <IoTodayOutline className="size-5" />
            <p className={`${isOpenSideBar ? 'block' : 'hidden max-lg:block '} max-sm:hidden`}>Today</p>
          </NavLink>

          <NavLink to="/tasks/upcoming" className={getNavLinkClass}>
            <MdOutlineUpcoming className="size-5" />
            <p className={`${isOpenSideBar ? 'block' : 'hidden max-lg:block'}  max-sm:hidden`}>Upcoming</p>
          </NavLink>

          <NavLink to="/tasks/completed" className={getNavLinkClass}>
            <FaRegCheckCircle className="size-5" />
            <p className={`${isOpenSideBar ? 'block' : 'hidden max-lg:block'} max-sm:hidden`}>Completed</p>
          </NavLink>
        </div>
      </div>


      {/* --- PROJECTS SECTION --- */}
      <div className="projects-section flex flex-col border-t-2 border-gray-200 max-sm:hidden w-full
      
      ">
        {/* 6. Ẩn tiêu đề "PROJECTS" khi thu gọn */}
        {isOpenSideBar && <p className="font-semibold font-sm text-gray-600 mt-5 p-3">PROJECTS</p>}

        {/* Dùng NavLink và Dynamic Route /projects/:projectId */}
        <NavLink to="/projects/work" className={getNavLinkClass}>
          <MdOutlineWorkHistory className="size-5" />
          <p className={`${isOpenSideBar ? 'block' : 'hidden max-lg:block'}`}>Work</p>
        </NavLink>

        <NavLink to="/projects/personal" className={getNavLinkClass}>
          <IoPerson className="size-5" />
          <p className={`${isOpenSideBar ? 'block' : 'hidden max-lg:block'}`}>Personal</p>
        </NavLink>

        <NavLink to="/projects/phoenix" className={getNavLinkClass}>
          <GoProjectRoadmap className="size-5" />
          <p className={`${isOpenSideBar ? 'block' : 'hidden max-lg:block'}`}>Work Phoenix</p>
        </NavLink>
      </div>
    </nav>
  );
})