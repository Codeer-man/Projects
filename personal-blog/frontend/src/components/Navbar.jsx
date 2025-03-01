import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import Login from "./registration/login";
import Logout from "./registration/logout";

export default function Navbar() {
  const { loggedIn, logout } = useAuth();
  return (
    <nav className="flex justify-between items-center h-auto w-screen p-5 bg-gray-100 shadow-md">
      <h1 className="text-xl font-bold">Logo</h1>
      <ul className="flex items-center justify-around gap-9">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 transition-colors duration-300 rounded ${
                isActive
                  ? "text-blue-500 font-bold border-b-2 border-blue-500"
                  : "text-gray-700"
              } hover:text-blue-600`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog-post"
            className={({ isActive }) =>
              `px-4 py-2 transition-colors duration-300 rounded ${
                isActive
                  ? "text-blue-500 font-bold border-b-2 border-blue-500"
                  : "text-gray-700"
              } hover:text-blue-600`
            }
          >
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `px-4 py-2 transition-colors duration-300 rounded ${
                isActive
                  ? "text-blue-500 font-bold border-b-2 border-blue-500"
                  : "text-gray-700"
              } hover:text-blue-600`
            }
          >
            Create Blog
          </NavLink>
        </li>
        <li>
          {loggedIn ? (
            <NavLink to="/logout">Logout</NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 transition-colors duration-300 rounded ${
                  isActive
                    ? "text-blue-500 font-bold border-b-2 border-blue-500"
                    : "text-gray-700"
                } hover:text-blue-600`
              }
            >
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
