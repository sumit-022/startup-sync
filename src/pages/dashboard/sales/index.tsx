import DashboardLayout from "@/components/layout";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MdAdd, MdRemoveRedEye } from "react-icons/md";
import { CgMediaLive } from "react-icons/cg";
import { BiHistory, BiPencil } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import Button from "@/components/atoms/button";
import Filters from "@/components/common/joborder/joborder-sort";
import JobOrderForm from "../../../components/common/joborder/joborder-form";
import Search from "../../../components/common/joborder/joborder-search";
import Tabs from "@/components/common/joborder/joborder-filters";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import AuthContext from "@/context/AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import qs from "qs";
import { useForm } from "react-hook-form";
import useSalesTable from "@/hooks/sales-table";
import { Box, Modal } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import LongMenu from "@/components/atoms/dropdown/menu";
import JobOrderView from "@/components/common/joborder/joborder-view";

export default function SalesDashboard() {
  const allData = useRef<any[]>([]);

  const [data, setData] = useState<any[]>([]);
  const [modal, setModal] = useState<
    "create" | "edit" | "view" | "flag" | null
  >(null);
  const [job, setJob] = useState<JobType | null>();
  const [serviceCordinator, setServiceCordinator] = useState<any[]>([]);
  const { user } = useContext(AuthContext);
  const { control } = useForm();

  const actions = [
    {
      icon: <IoMdEye />,
      name: "View",
      onClick: (params: any) => {
        setJob(data.find((item) => item.id === params.id));
        setModal("view");
      },
    },
    {
      icon: <BiPencil />,
      name: "Edit",
      onClick: (params: any) => {
        setJob(data.find((item) => item.id === params.id));
        setModal("edit");
      },
    },
  ];

  const renderActions = (params: any) => {
    return <LongMenu options={actions} params={params} />;
  };

  const {
    rows,
    columns,
    loading,
    data: realData,
  } = useSalesTable({
    status: "QUERYRECEIVED",
    renderActions,
  });

  useEffect(() => {
    instance.get("/users").then((res) => {
      setServiceCordinator(parseAttributes(res.data.data));
    });
  }, []);

  const apiquery = qs.stringify({});

  const fetchTableData = () => {
    instance.get("/jobs?populate=*").then((res) => {
      allData.current = parseAttributes(res.data);
      setData(parseAttributes(res.data).sort((a: any, b: any) => a.id - b.id));
    });
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <DashboardLayout header sidebar>
      <div className="flex gap-4">
        <Button
          icon={<MdAdd />}
          onClick={() => {
            setModal("create");
          }}
        >
          Add
        </Button>
        <Button icon={<CgMediaLive />}>Live Jobs</Button>
        <Button icon={<TiCancel />} className="bg-red-600">
          Cancelled Jobs
        </Button>
        <Button icon={<BiHistory />} className="bg-green-600">
          History
        </Button>
      </div>
      <div className="my-4 flex flex-col gap-3">
        <Search placeholder="Enter Job Code to search.." />
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Box>
      <Modal open={Boolean(modal)} onClose={() => setModal(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            overflow: "scroll",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {modal === "create" && (
            <JobOrderForm
              callback={fetchTableData}
              authData={user}
              mode="create"
              onClose={() => setModal(null)}
            />
          )}
          {modal === "edit" && (
            <JobOrderForm
              callback={fetchTableData}
              authData={user}
              mode="edit"
              onClose={() => setModal(null)}
              data={job}
            />
          )}
          {modal === "view" && <JobOrderView data={job} />}
        </Box>
      </Modal>
    </DashboardLayout>
  );
}
