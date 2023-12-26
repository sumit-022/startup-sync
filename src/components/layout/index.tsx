import React, { useState } from "react";

import Sidebar from "./sidebar";
import Header from "./header";
import { useAuth } from "@/context/AuthContext";
import Loading from "../atoms/loading";

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
  sidebar,
  header,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { authData, isLoading } = useAuth();

  if (isLoading) return <Loading />;
  return (
    <div className="grid grid-rows-[auto,1fr] overflow-hidden h-screen">
      {header && (
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={authData}
        />
      )}
      <div className="grid relative grid-cols-[auto,1fr,auto] overflow-hidden">
        {sidebar && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <main
          className={`${
            decoration ? decoration : "bg-white p-4"
          } ${className} col-span-2 overflow-y-auto overflow-x-hidden`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
