import DashboardLayout from "@/components/layout";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Button from "@/components/atoms/button";
import { useRouter } from "next/router";
import instance from "@/config/axios.config";
import Loading from "@/components/atoms/loading";
import Dropdown from "@/components/atoms/dropdown";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import parseAttributes from "@/utils/parse-data";

const VendorPage = () => {
  const router = useRouter();
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterVendor = () => {
    setIsLoading(true);
    instance.post("/vendors/form/generate-vendor-id").then((res) => {
      router.push(`/vendor/form/${res.data}`);
    });
  };

  useEffect(() => {
    instance.get("/vendors?=populate*").then((res) => {
      setVendors(parseAttributes(res.data.data));
    });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Vendor Name",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Vendor Email",
      width: 200,
      editable: true,
    },
    {
      field: "salesemail",
      headerName: "Sales Email",
      width: 200,
      editable: true,
    },
  ];
  if (isLoading) return <Loading />;
  return (
    <DashboardLayout header sidebar>
      <div className="flex gap-4">
        <Dropdown activeCondition={false}>
          {(handleClick, open) => (
            <div className="relative">
              <Button
                className="bg-blue-500 flex gap-1 hover:bg-blue-600 text-white"
                onClick={handleClick}
              >
                <MdAdd />
                <span>Register Vendor</span>
              </Button>
              {open && (
                <div className="absolute flex flex-col z-50 bg-white top-12 border-y-primary-light-grey w-[300px] rounded-md shadow-xl">
                  <Button
                    className="!text-black rounded-none bg-transparent hover:bg-gray-100"
                    onClick={handleRegisterVendor}
                  >
                    Register Manually
                  </Button>
                  <Button className="!text-black rounded-none bg-transparent hover:bg-gray-100">
                    Send Invitation Link to Vendor
                  </Button>
                </div>
              )}
            </div>
          )}
        </Dropdown>
      </div>
      <div className="mt-4">
        <DataGrid
          rows={vendors}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          // pageSizeOptions={[100]}
          checkboxSelection
        />
      </div>
    </DashboardLayout>
  );
};

export default VendorPage;
