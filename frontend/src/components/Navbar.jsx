import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          SmartLMS
        </Link>

        {/* Menu */}
        <nav className="flex items-center gap-6">

          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-gray-600"
            }
          >
            Courses
          </NavLink>

           {/*Only logged in user can see the myLearnings*/} 
          {user && (
                <NavLink
                    to="/my-learning"
                    className={({ isActive }) =>
                    isActive ? "text-indigo-600 font-semibold" : "text-gray-600"
                    }
                >
                    My Learning
                </NavLink>
           )}

          {/* IF USER IS LOGGED IN */}
          {user ? (
            <>
              {/* Show user name if needed */}
              <span className="text-gray-700 font-medium">
                Hi, {user.name}
              </span>

              <button
                onClick={() => dispatch(logout())}
                className="px-4 py-1 bg-red-600 text-white rounded"
              >
                Logout
              </button>
            </>
          ) : (
            /* ELSE SHOW LOGIN BUTTON */
            <Link
              to="/login"
              className="px-4 py-1 bg-indigo-600 text-white rounded"
            >
              Login
            </Link>
          )}

        </nav>
      </div>
    </header>
  );
}
