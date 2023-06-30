import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Sidebar.css";

export default function Sidebar() {
  const {isDark}=useSelector(state => state.theme)
  return (
    <div className={`sidebar ${isDark ? 'sidebar-dark' : 'sidebar-light'}`}>
      <h1 className="sidebar-title">به داشبورد خود خوش آمدید</h1>
      <ul className="sidebar-links">
        <NavLink to="/">
            <AiOutlineHome className="icon" />
            صفحه اصلی
        </NavLink>
        <NavLink to="/products">
            <MdProductionQuantityLimits className="icon" />
            محصولات
        </NavLink>
        <NavLink to="/comments">
            <BiCommentDetail className="icon" />
            کامنت ها
        </NavLink>
      </ul>
    </div>
  );
}
