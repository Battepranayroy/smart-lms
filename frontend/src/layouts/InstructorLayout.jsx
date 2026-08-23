import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function InstructorLayout() {
  return (
    <div className="flex pt-20">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 h-screen p-5 space-y-4 shadow">
        <h2 className="text-xl font-bold mb-4">Instructor Panel</h2>

        <NavLink
          to="/instructor/dashboard"
          className="block p-2 rounded hover:bg-gray-200"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/instructor/courses"
          className="block p-2 rounded hover:bg-gray-200"
        >
          My Courses
        </NavLink>

        <NavLink
          to="/instructor/create-course"
          className="block p-2 rounded hover:bg-gray-200"
        >
          Create Course
        </NavLink>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
