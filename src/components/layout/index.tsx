import React, { useState } from "react";

import Sidebar from "./sidebar";
import Header from "./header";

interface DashboardLayoutProperties {
  children: React.ReactNode;
  rightbar?: React.ReactNode | (() => JSX.Element);
  sidebar?: boolean;
  header?: boolean;
  className?: string;
  decoration?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProperties> = ({
  children,
  rightbar,
  className,
  decoration,
  sidebar = true,
  header = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid grid-rows-[auto,1fr] overflow-hidden h-screen">
      {header && (
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      <div className="grid relative grid-cols-[auto,1fr,auto]">
        {sidebar && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <main
          className={`${
            decoration ? decoration : "bg-white p-4"
          } ${className} col-span-2`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
