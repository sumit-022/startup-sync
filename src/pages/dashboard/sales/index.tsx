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
import formatDate from "@/utils/date-formatter";
import CancelJobButton from "@/components/atoms/button/delete";

import FlagJobButton from "@/components/atoms/button/flag";
import qs from "qs";
import FormInputAutoComplete from "@/components/atoms/input/auto-complete";
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

  const [filters, setFilters] = useState<FilterType>({
    queriedFrom: () => true,
    queriedUpto: () => true,
    quotedFrom: () => true,
    quotedUpto: () => true,
    type: () => true,
    assignedTo: () => true,
    status: () => true,
  });

  const actions = [
    {
      icon: <IoMdEye />,
      name: "View",
      onClick: (params: any) => {
        setJob(rows.find((item) => item.id === params.id));
        setModal("view");
      },
    },
    {
      icon: <BiPencil />,
      name: "Edit",
      onClick: (params: any) => {
        setJob(rows.find((item) => item.id === params.id));
        setModal("edit");
      },
    },
  ];

  const renderActions = (params: any) => {
    return <LongMenu options={actions} params={params} />;
  };

  const { rows, columns, loading } = useSalesTable({
    status: "QUERYRECEIVED",
    renderActions,
  });

  useEffect(() => {
    let newData = [...allData.current];
    Object.values(filters).forEach((filterFunc) => {
      newData = newData.filter(filterFunc);
    });
    setData(newData);
  }, [filters]);

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

  const convertToCSV = (objArray: any) => {
    const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (let index in array[i]) {
        if (line != "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }

    return str;
  };

  const downloadTable = async () => {
    const csvdata = convertToCSV(data);
    const blob = new Blob([csvdata], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "joborder.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
        <Button
          icon={<CgMediaLive />}
          onClick={() => {
            setFilters({
              ...filters,
              status: (item) =>
                item.status !== "JOBCANCELLED" ??
                item.status !== "JOBCOMPLETED",
            });
          }}
        >
          Live Jobs
        </Button>
        <Button
          icon={<TiCancel />}
          className="bg-red-600"
          onClick={() => {
            setFilters({
              ...filters,
              status: (item) => item.status === "JOBCANCELLED",
            });
          }}
        >
          Cancelled Jobs
        </Button>
        <Button icon={<BiHistory />} className="bg-green-600">
          History
        </Button>
      </div>
      <div className="my-4 flex flex-col gap-3">
        <Search
          placeholder="Enter Job Code to search.."
          onChange={(event) => {
            const newData = allData.current.filter((item) => {
              return item.jobCode.includes(event.target.value);
            });
            setData(newData);
          }}
        />
        <Tabs
          data={data}
          callback={(status: JobType["status"][]) => {
            console.log(status);
            setFilters({
              ...filters,
              status: (item) =>
                status.length > 0 ? status.includes(item.status) : true,
            });
          }}
        />
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
