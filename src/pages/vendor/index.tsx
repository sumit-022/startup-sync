import DashboardLayout from "@/components/layout";
import React, { useEffect, useState } from "react";
import DeleteVendor from "@/components/atoms/button/delete-vendor";
import { MdAdd, MdEdit } from "react-icons/md";
import Button from "@/components/atoms/button";
import { useRouter } from "next/router";
import instance from "@/config/axios.config";
import Loading from "@/components/atoms/loading";
import Dropdown from "@/components/atoms/dropdown";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import parseAttributes from "@/utils/parse-data";
import { IconButton } from "@mui/material";
import MailFormLink from "@/components/atoms/button/mail-formlink";

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

  const getVendors = () => {
    setIsLoading(true);
    instance
      .get("/vendors?populate=*")
      .then((res) => {
        setVendors(parseAttributes(res.data.data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getVendors();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Vendor Name",
      width: 200,
      filterable: false,
      editable: true,
    },
    {
      field: "email",
      headerName: "Vendor Email",
      width: 200,
      editable: true,
      filterable: false,
    },
    {
      field: "country",
      headerName: "Country",
      width: 200,
      filterable: false,
      editable: true,
    },
    {
      field: "categories",
      headerName: "Categories",
      width: 200,
      editable: true,
      sortable: false,
      filterable: true,
      renderCell: (params) => {
        return (
          <div className="flex flex-wrap gap-2 overflow-y-scroll max-h-20">
            {params.value.map((category: any, index: number) => (
              <span key={index} className="bg-gray-200 rounded-md p-1">
                {category.title}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      field: "sales",
      headerName: "Sales",
      sortable: false,
      width: 200,
      editable: true,
      filterable: false,
      renderCell: (params) => {
        return (
          <div className="flex flex-col gap-1 overflow-y-scroll max-h-20">
            <span className="text-sm">{params?.value?.name}</span>
            <span className="text-sm">{params?.value?.mail}</span>
            <span className="text-sm">{params?.value?.mobile}</span>
          </div>
        );
      },
    },
    {
      field: "accounts",
      headerName: "Accounts",
      sortable: false,
      width: 200,
      editable: true,
      filterable: false,
      renderCell: (params) => {
        return (
          <div className="flex flex-col gap-1 overflow-y-scroll max-h-20">
            <span className="text-sm">{params?.value?.name}</span>
            <span className="text-sm">{params?.value?.mail}</span>
            <span className="text-sm">{params?.value?.mobile}</span>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      editable: true,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex gap-4">
            <IconButton
              className="bg-yellow-500 text-sm hover:bg-yellow-600 text-white"
              onClick={() => router.push(`/vendor/view/${params.row.id}`)}
            >
              <MdEdit />
            </IconButton>
            <DeleteVendor id={params.row.id} callback={getVendors} />
          </div>
        );
      },
    },
  ];

  const rows = vendors.map((vendor: any) => {
    return {
      id: vendor.id,
      name: vendor.name,
      email: vendor.email,
      country: vendor.country,
      categories: vendor.services,
      sales: vendor.salescontact,
      accounts: vendor.accountscontact,
    };
  });
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
                  <MailFormLink />
                </div>
              )}
            </div>
          )}
        </Dropdown>
      </div>
      <div className="mt-4">
        <DataGrid
          rows={rows}
          rowHeight={120}
          columns={columns}
          getRowClassName={(params) => {
            return "cursor-pointer";
          }}
          disableRowSelectionOnClick
          onRowClick={(params) => {
            router.push(`/vendor/view/${params.row.id}`);
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default VendorPage;
