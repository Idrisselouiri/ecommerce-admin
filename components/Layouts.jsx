import DashSidebar from "./DashSidebar";
import React from "react";

const Layouts = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col my-10 md:flex-row md:my-0">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {children}
    </div>
  );
};

export default Layouts;
