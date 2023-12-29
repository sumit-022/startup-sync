import React, { useEffect } from "react";
import DashboardLayout from "@/components/layout";
import VendorDetailForm from "@/components/common/vendor/forms/vendor-detail";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";

const VendorDetailsPage = (data: any) => {
  const [categories, setCategories] = React.useState([]);
  return (
    <DashboardLayout header sidebar>
      <h1 className="text-center font-bold text-2xl py-2 bg-[#fb5913] rounded-full text-white">
        VIEW VENDOR DETAILS
      </h1>
      <VendorDetailForm mode="view" data={data} />
    </DashboardLayout>
  );
};

export default VendorDetailsPage;
