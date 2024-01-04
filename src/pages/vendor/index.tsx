import DashboardLayout from "@/components/layout";
import React, { useEffect, useState, useRef, use } from "react";
import DeleteVendor from "@/components/atoms/button/delete-vendor";
import { MdAdd, MdEdit } from "react-icons/md";
import Button from "@/components/atoms/button";
import { useRouter } from "next/router";
import instance from "@/config/axios.config";
import Loading from "@/components/atoms/loading";
import Dropdown from "@/components/atoms/dropdown";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import parseAttributes from "@/utils/parse-data";
import MailFormLink from "@/components/atoms/button/mail-formlink";
import VendorFilters, {
  VendorFilterType,
} from "@/components/common/vendor/filters";
import EditVendor from "@/components/atoms/button/edit-vendor";
import { useSearchParams } from "next/navigation";
import Search from "@/components/common/joborder/joborder-search";
import qs from "qs";

const VendorPage = () => {
  const router = useRouter();
  const [vendors, setVendors] = useState<{
    loading: boolean;
    totalPages: number;
    total: number;
    data: any[];
  }>({
    loading: false,
    total: 0,
    totalPages: 0,
    data: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;

  const [filters, setFilters] = useState<VendorFilterType>({
    category: () => true,
  });

  const getVendors = (page: number = 1) => {
    const apiqueries = qs.stringify({
      filters: {
        $or: [
          {
            name: {
              $containsi: search,
            },
          },
          {
            services: {
              title: {
                $containsi: search,
              },
            },
          },
        ],
      },
    });
    setVendors({ ...vendors, loading: true });
    instance
      .get(
        `/vendors?pagination[page]=${page}&pagination[pageSize]=10&${apiqueries}&populate=*`
      )
      .then((res) => {
        setVendors({
          loading: false,
          total: res.data.meta.pagination.total,
          totalPages: res.data.meta.pagination.pageCount,
          data: parseAttributes(res.data.data),
        });
      });
  };

  useEffect(() => {
    getVendors(parseInt(page as string));
  }, [page, search]);

  let count = 0;

  const handleRegisterVendor = () => {
    setIsLoading(true);
    instance.post("/vendors/form/generate-vendor-id").then((res) => {
      setIsLoading(false);
      const base =
        process.env.NEXT_PUBLIC_BASE_FRONTEND_URL || window.location.origin;
      window.open(`${base}/vendor/form/${res.data}`, "_blank");
    });
  };

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
            <EditVendor id={params.row.id} callback={getVendors} />
            <DeleteVendor id={params.row.id} callback={getVendors} />
          </div>
        );
      },
    },
  ];

  const rows = vendors.data.map((vendor: any) => {
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
      <div className="my-4">
        <Search
          placeholder="Search Vendor by Name or Category"
          className="mb-4"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <VendorFilters
          setFilters={(filters) => {
            setFilters(filters);
          }}
        />
      </div>
      <div className="mt-4">
        <DataGrid
          rows={rows}
          rowHeight={120}
          rowCount={vendors.total}
          onPaginationModelChange={(params) => {
            router.push({
              pathname: router.pathname,
              query: { page: params.page + 1 },
            });
          }}
          initialState={{
            pagination: {
              paginationModel: {
                page: parseInt(page as string) - 1,
                pageSize: 10,
              },
            },
          }}
          columns={columns}
          loading={vendors.loading}
          getRowClassName={(params) => {
            return "cursor-pointer";
          }}
          disableRowSelectionOnClick
          onRowClick={(params) => {
            router.push(`/vendor/view/${params.row.id}`);
          }}
          paginationMode="server"
        />
      </div>
    </DashboardLayout>
  );
};

export default VendorPage;
