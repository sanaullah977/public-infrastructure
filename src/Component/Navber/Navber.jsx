import React, { useState } from "react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { CgProfile } from "react-icons/cg";

const Navber = () => {
  const { user, setUser, logout } = useAuth();
  console.log(user);

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
                alt="Tailwind CSS Navbar component"
                src={user?.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <div className="navbar-end">
              {user ? (
                <button onClick={handleLogout} className="">
                  Log Out
                </button>
              ) : (
                <Link to="/login">
                  {" "}
                  <a className="">Log In</a>
                </Link>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navber;
