import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../store/auth";
// import { logo } from "../../public/logo.png";

export default function Navbar() {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  function homepage() {
    navigate("/");
  }

  return (
    <nav className="flex justify-between items-center h-auto w-screen p-5 bg-gray-300 shadow-md ">
      <h2
        onClick={homepage}
        className="text-xl font-bold tracking-wide cursor-pointer"
      >
        <span className="text-red-500">/</span>RAREBLOCKS
      </h2>
      {/* <img src={logo} alt="logo" /> */}
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
            // <NavLink to="/logout">Logout</NavLink>
            <NavLink to="/profile">
              <CgProfile className="mr-8" />{" "}
            </NavLink>
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
