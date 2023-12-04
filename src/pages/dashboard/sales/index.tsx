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
import { MdOutlineFilterList } from "react-icons/md";
const Table = dynamic(() => import("@/components/atoms/table"), {
  ssr: false,
});
import Modal from "@/components/atoms/modal";
import { TbArrowsSort } from "react-icons/tb";
import FilterButton from "@/components/atoms/button/filter";
import { modalAtom } from "@/atoms/modal.atom";
import { useAtom } from "jotai";
import JobOrderForm from "../../../components/common/joborder/joborder-form";
import SearchJobOrder from "../../../components/common/joborder/joborder-search";

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
        <Button icon={<RiAlarmWarningFill />} className="bg-yellow-500">
          Live Jobs
        </Button>
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
        <div className="flex">
          <FilterButton
            title="Filter"
            icon={<MdOutlineFilterList />}
            filterOptions={[
              { name: "Live Jobs", value: 100, children: [] },
              { name: "Cancelled Jobs", value: 100, children: [] },
              { name: "History", value: 100, children: [] },
            ]}
          />
          <FilterButton
            title="Sort By"
            icon={<TbArrowsSort />}
            filterOptions={[
              { name: "Job Code", children: ["2023", "2022"] },
              { name: "Recieved Date", children: ["Ascending", "Descending"] },
              { name: "Qouted Date", children: ["Ascending", "Descending"] },
            ]}
          />
        </div>
        <Table data={data} />
      </div>
      <Modal active={showModal} setActive={setShowModal}>
        <JobOrderForm mode="create" options={["create"]} />
      </Modal>
    </DashboardLayout>
  );
}
