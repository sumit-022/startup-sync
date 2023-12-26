import DashboardLayout from "@/components/layout";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button, IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa6";

const VendorPage = () => {
  return (
    <DashboardLayout header sidebar>
      <div className="flex gap-4">
        <Button
          variant="contained"
          color="primary"
          className="bg-primary-bright-blue"
        >
          Register Vendor
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default VendorPage;
