import React from "react";
import Image from "next/image";
import { RiMenu2Line } from "react-icons/ri";

import HelpIcon from "../../../assets/svg/icon/help.svg";
import NotificationIcon from "../../../assets/svg/icon/notification.svg";
import logo from "@/assets/image/logo.jpg";
import Link from "next/link";
interface DashboardHeaderProperties {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader: React.FC<DashboardHeaderProperties> = ({
  setSidebarOpen,
  sidebarOpen,
}) => {
  const user = "Józef";

  return (
    <header className="drop-shadow-1 sticky top-0 z-[1000] flex w-full border-b-2 border-b-[#E7EDFC] bg-white shadow-sm">
      <div className="shadow-2 flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-5">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            <button
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(event) => {
                event.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
              className="border-stroke block rounded-sm border bg-white p-1.5 shadow-sm lg:hidden"
            >
              <RiMenu2Line />
            </button>
          </div>
          <Link href="/">
            <Image src={logo} alt="logo" width={90} height={90} />
          </Link>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <p className="text-sm text-primary-cool-grey">
              Welcome back {user} 👋, Let’s get back to managing your
              properties.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-primary-cool-grey sm:gap-4 md:gap-6 lg:gap-8">
          <Image className="cursor-pointer" src={NotificationIcon} alt="" />
          {/* <Image className="cursor-pointer" src={SettingIcon} alt="" /> */}
          <div className="flex cursor-pointer flex-row gap-2 hover:text-black">
            <Image src={HelpIcon} alt="" />
            <h3>Help</h3>
          </div>
          {/* <div className="rounded shadow-sm">
            <Image src={ProfileIcon} alt="" />
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
