import SideBar from "./SideBar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <SideBar />
      </div>
      {children}
    </div>
  );
};

export default Layout;
