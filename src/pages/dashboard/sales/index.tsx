import DashboardLayout from "@/components/layout";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { CgMediaLive } from "react-icons/cg";
import { RiAlarmWarningFill } from "react-icons/ri";
import dynamic from "next/dynamic";
import { BiHistory } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import Button from "@/components/atoms/button";
import { tableData } from "@/data/dashboard";
const Table = dynamic(() => import("@/components/atoms/table"), {
  ssr: false,
});
import Filters from "@/components/common/joborder/joborder-sort";
import Modal from "@/components/atoms/modal";
import { TbArrowsSort } from "react-icons/tb";
import { modalAtom } from "@/atoms/modal.atom";
import { useAtom } from "jotai";
import JobOrderForm from "../../../components/common/joborder/joborder-form";
import SearchJobOrder from "../../../components/common/joborder/joborder-search";
import Tabs from "@/components/common/joborder/joborder-filters";

export default function SalesDashboard() {
  const [data, setData] = useState(tableData);
  const [showModal, setShowModal] = useAtom(modalAtom);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filtered = tableData.filter((item) => {
      return item.jobCode.toLowerCase().includes(value.toLowerCase());
    });
    setData(filtered);
  };
  return (
    <DashboardLayout>
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
        <Filters />
        <Table data={data} />
      </div>
      <Modal active={showModal} setActive={setShowModal}>
        <JobOrderForm mode="create" options={["create"]} />
      </Modal>
    </DashboardLayout>
  );
}
