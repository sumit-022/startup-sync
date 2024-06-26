import React from "react";
import logo from "@/assets/svg/logo.svg";
import Image from "next/image";
import { Typography } from "@mui/material";
import HelpIcon from "@/assets/svg/icon/help.svg";

const Header = () => {
  return (
    <div className="flex p-8 justify-between items-center border-b-2 pb-2">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="logo" width={50} height={50} />
        <Typography variant="h5" sx={{ color: "#1bb1d8" }}>
          Vendor Requisition Form
          <small className="block text-sm">Startup Sync</small>
          <small className="block text-sm">
            Indian Institute of Information Technology, Lucknow
          </small>
        </Typography>
      </div>
      <div className="flex cursor-pointer flex-row gap-2 hover:text-black text-gray-500 items-center">
        <Image src={HelpIcon} alt="" />
        <h3>Help</h3>
      </div>
    </div>
  );
};

export default Header;
