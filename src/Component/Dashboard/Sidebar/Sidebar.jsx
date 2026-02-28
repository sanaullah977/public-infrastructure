import { useState } from "react";
import { Link } from "react-router";

import logo from "../../../assets/g.png";
// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";

// User Menu

import useRole from "../../../Hooks/useRole";
import useAuth from "../../../Hooks/useAuth";
import MenuItem from "./Menu/MenuItem";
import ClinteMenu from "./Menu/ClinteMenu";
import StaffeMenu from "./Menu/StaffeMenu";
import AdminMenu from "./Menu/AdminMenu";
import LoadingSpinner from "../Common/LoadingSpinner";

const Sidebar = () => {
  const { logout } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role, isRoleLoading] = useRole();
  console.log(role);

  const handleLogout = () => {
    logout()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  if (isRoleLoading) return;
  <LoadingSpinner />;

  return (
    <>
      <div className="bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200 flex justify-between md:hidden items-center transition-colors duration-300">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/dashboard/profile">
              <img className="rounded-full" src={logo} alt="logo" width="100" height="100" />
            </Link>
          </div>
        </div>

        <label
         
          className="btn btn-circle swap swap-rotate h-8 w-8"
        >
        
          <input 
           onClick={handleToggle}
           type="checkbox" />

          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>

      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden 
      bg-gray-100 dark:bg-slate-900
      w-64 space-y-6 px-2 py-4 
      absolute inset-y-0 left-0 transform
      ${isActive && "-translate-x-full"}
      md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div>
            <div
              className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center 
                        bg-orange-100 dark:bg-slate-800 
                        mx-auto transition-colors duration-300"
            >
              <Link to="/">
                <img src={logo} alt="logo" width="100" height="100" />
              </Link>
            </div>
          </div>

          {/* Menu Section */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="space-y-2">
              <MenuItem
                icon={BsGraphUp}
                label="Statistics"
                address="/dashboard"
              />

              {role === "clinte" && <ClinteMenu />}
              {role === "staffe" && <StaffeMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Section */}
          <div>
            <hr className="border-gray-300 dark:border-slate-700 transition-colors" />

            <MenuItem
              icon={FcSettings}
              label="Profile"
              address="/dashboard/profile"
            />

            <button
              onClick={logout}
              className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 
                     text-gray-600 dark:text-gray-300
                     hover:bg-gray-300 dark:hover:bg-slate-800
                     hover:text-gray-700 dark:hover:text-white
                     transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5" />
              <span onClick={handleLogout} className="mx-4 font-medium">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
