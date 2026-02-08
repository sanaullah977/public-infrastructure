import React, { useState } from "react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { CgProfile } from "react-icons/cg";

const Navber = () => {
  const { user, setUser, logout, role } = useAuth();
  console.log(user,role);

  const handleLogout = () => {
    logout()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const Navber = (
    <>
      <li className="font-semibold">
        <NavLink to="">
          <a>Home</a>
        </NavLink>
      </li>
      <li className="font-semibold">
        <NavLink to="allissues">
          <a>All Issues</a>
        </NavLink>
      </li>
      <li className="font-semibold">
        <NavLink to="addissues">
          <a>Add Issue</a>
        </NavLink>
      </li>
      <li className="font-semibold">
        <NavLink to="myissue">
          <a>My Report</a>
        </NavLink>
      </li>
      
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {Navber}
            </ul>
          </div>
          <a className=" btn-ghost text-xl">
            <Logo />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Navber}</ul>
        </div>

        <div className="navbar-end dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt=""
                src={user?(user.photoURL):(<CgProfile/>)}
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <Link to='/dashboard/profile'>
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            
            </Link>
           <Link to='/dashboard'>
            <li>
              <a>Dashboard</a>
            </li>
           </Link>
            <li className=" hover:bg-gray-200">
              {user ? (
                <a onClick={handleLogout} className="">
                  Log Out
                </a>
              ) : (
                <Link to="/login">
                  {" "}
                  <a className="">Log In</a>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navber;
