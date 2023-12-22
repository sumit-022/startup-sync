import DashboardLayout from "@/components/layout";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { CgMediaLive } from "react-icons/cg";
import dynamic from "next/dynamic";
import { BiHistory } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import Button from "@/components/atoms/button";
import { tableHeaders } from "@/data/dashboard";
const Table = dynamic(() => import("@/components/atoms/table"), {
  ssr: false,
});
import Filters from "@/components/common/joborder/joborder-sort";
import Modal from "@/components/atoms/modal";
import { modalAtom } from "@/atoms/modal.atom";
import { useAtom } from "jotai";
import JobOrderForm from "../../../components/common/joborder/joborder-form";
import SearchJobOrder from "../../../components/common/joborder/joborder-search";
import Tabs from "@/components/common/joborder/joborder-filters";
import { useAuth } from "@/context/AuthContext";
import instance from "@/config/axios.config";
import { parseAttributes } from "@/utils/parse-data";

export default function SalesDashboard() {
  const [data, setData] = useState<any[]>([]);
  const { authData, isLoading } = useAuth();
  const [showModal, setShowModal] = useAtom(modalAtom);
  const [selectedHeaders, setSelectedHeaders] = useState(tableHeaders);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filtered = data.filter((item) => {
      return item.jobCode.toLowerCase().includes(value.toLowerCase());
    });
    setData(filtered);
  };

  const fetchTableData = () => {
    instance.get("/jobs?populate=*").then((res) => {
      setData(parseAttributes(res.data));
    });
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  console.log("data", data);

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
    <DashboardLayout user={authData}>
      <div className="flex gap-4">
        <Button
          icon={<MdAdd />}
          onClick={() => {
            setShowModal(true);
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
        <SearchJobOrder
          onChange={(e) => {
            handleSearch(e);
          }}
        />
        <Tabs allcount="100" qoutedcount="100" querycount="100" />
        <Filters
          availableHeaders={selectedHeaders}
          setSelectedHeaders={setSelectedHeaders}
          onDownload={() => {
            downloadTable();
          }}
        />

        <Table
          data={data}
          headers={selectedHeaders.filter((item) => item.show)}
        />
      </div>
      <Modal
        active={showModal}
        setActive={setShowModal}
        className="h-5/6 w-3/4 overflow-scroll"
      >
        <JobOrderForm
          mode="create"
          authData={authData}
          setShowModal={setShowModal}
          callback={fetchTableData}
        />
      </Modal>
    </DashboardLayout>
  );
}
