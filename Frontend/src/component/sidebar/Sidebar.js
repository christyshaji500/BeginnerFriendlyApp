import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/home"); 
  };

  return (
    <aside className="w-1/4 bg-gray-100  p-6 shadow-md">
      <ul className="space-y-4">
        <li>
          <Link
            to="/myaccount"
            className={`text-lg px-4 py-2 block rounded ${
              isActive("/myaccount")
                ? "text-white bg-[#F50963]"
                : "text-gray-700 hover:text-gray-500"
            }`}
          >
            My Account
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={`text-lg px-4 py-2 block rounded ${
              isActive("/profile")
                ? "text-white bg-[#F50963]"
                : "text-gray-700 hover:text-gray-500"
            }`}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/ads"
            className={`text-lg px-4 py-2 block rounded ${
              isActive("/ads")
                ? "text-white bg-[#F50963]"
                : "text-gray-700 hover:text-gray-500"
            }`}
          >
            Ads
          </Link>
        </li>
        <li>
          <Link
            to="/postads"
            className={`text-lg px-4 py-2 block rounded ${
              isActive("/postads")
                ? "text-white bg-[#F50963]"
                : "text-[#F50963] hover:text-gray-500"
            }`}
          >
            Post Ads
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className={`text-lg px-4 py-2 block rounded ${
              isActive("/login")
                ? "text-white bg-[#F50963]"
                : "text-red-900 hover:text-red-500"
            }`}
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
