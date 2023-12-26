import DashboardLayout from "@/components/layout";
import React from "react";
import { MdAdd } from "react-icons/md";
import Button from "@/components/atoms/button";
import { useRouter } from "next/router";

const VendorPage = () => {
  const router = useRouter();
  return (
    <DashboardLayout header sidebar>
      <div className="flex gap-4">
        <Button icon={<MdAdd />} onClick={() => router.push("/vendor/add")}>
          Register Vendor
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default VendorPage;
