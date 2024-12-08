
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Layout;
