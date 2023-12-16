import DashboardLayout from "@/components/layout";
import React from "react";
import { useAuth } from "@/context/AuthContext";

const VendorPage = () => {
  const { authData } = useAuth();
  return (
    <DashboardLayout header sidebar user={authData}>
      <h1>Hello</h1>
    </DashboardLayout>
  );
};

export default VendorPage;
