import DashboardLayout from "@/components/layout";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MdAdd, MdRemoveRedEye } from "react-icons/md";
import { CgMediaLive } from "react-icons/cg";
import { BiHistory } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import Button from "@/components/atoms/button";
import Filters from "@/components/common/joborder/joborder-sort";
import Modal from "@/components/atoms/modal";
import { modalAtom } from "@/atoms/modal.atom";
import { useAtom } from "jotai";
import JobOrderForm from "../../../components/common/joborder/joborder-form";
import Search from "../../../components/common/joborder/joborder-search";
import Tabs from "@/components/common/joborder/joborder-filters";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import AuthContext from "@/context/AuthContext";
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterOperator,
} from "@mui/x-data-grid";
import formatDate from "@/utils/date-formatter";
import status from "@/components/atoms/table/status";
import ViewJobButton from "@/components/atoms/button/view";
import CancelJobButton from "@/components/atoms/button/delete";
import FlagJobButton from "@/components/atoms/button/flag";
import EditJobButton from "@/components/atoms/button/edit";
import GenerateRFQButton from "@/components/atoms/button/job-rfq";
import qs from "qs";
import FormInputAutoComplete from "@/components/atoms/input/auto-complete";
import { useForm } from "react-hook-form";

export default function SalesDashboard() {
  const allData = useRef<any[]>([]);

  const [data, setData] = useState<any[]>([]);
  const [serviceCordinator, setServiceCordinator] = useState<any[]>([]);
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useAtom(modalAtom);
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

  const columns: GridColDef[] = [
    {
      field: "jobCode",
      headerName: "Job Code",
      width: 130,
    },
    {
      field: "description",
      headerName: "Job Description",
      width: 200,
    },
    {
      field: "quotedAt",
      headerName: "Quoted Date",
      width: 150,
    },
    {
      field: "receivedAt",
      headerName: "Received Date",
      width: 150,
    },
    {
      field: "shipName",
      headerName: "Ship Name",
      width: 200,
    },
    {
      field: "assignedTo",
      headerName: "Service Coordinator",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return status(params.value);
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex gap-2">
            <FlagJobButton
              job={data.find((item) => item.id === params.row.id)}
            />
            <ViewJobButton
              job={data.find((item) => item.id === params.row.id)}
            />
            <EditJobButton
              job={data.find((item) => item.id === params.row.id)}
              callback={fetchTableData}
            />
            <CancelJobButton
              job={data.find((item) => item.id === params.row.id)}
              callback={fetchTableData}
            />
          </div>
        );
      },
    },
  ];

  const rows = data.map((item) => {
    return {
      id: item.id,
      jobCode: item.jobCode,
      description: item.description,
      quotedAt: formatDate(item.quotedAt),
      receivedAt: formatDate(item.receivedAt),
      shipName: item.shipName,
      status: item.status,
      assignedTo: item.assignedTo.fullname,
    };
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
    // Convert the table data to csv and download it
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
            setShowModal(true);
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
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
      <Modal
        active={showModal}
        setActive={setShowModal}
        className="h-5/6 w-3/4 overflow-scroll"
      >
        <JobOrderForm
          mode="create"
          authData={user}
          setShowModal={setShowModal}
          callback={fetchTableData}
        />
      </Modal>
    </DashboardLayout>
  );
}
