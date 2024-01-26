import DashboardLayout from "@/components/layout";
import React, { useContext, useEffect, useState } from "react";
import { mainTabs, subTabs } from "@/data/sales";
import { MdAdd } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import Filters from "@/components/common/joborder/joborder-sort";
import JobOrderForm from "../../../components/common/joborder/joborder-form";
import Search from "../../../components/common/joborder/joborder-search";
import AuthContext from "@/context/AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import useSalesTable from "@/hooks/sales-table";
import {
  Box,
  Modal,
  Fab,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { IoMdEye } from "react-icons/io";
import LongMenu from "@/components/atoms/dropdown/menu";
import JobOrderView from "@/components/common/joborder/joborder-view";

export default function SalesDashboard() {
  const [modal, setModal] = useState<
    "create" | "edit" | "view" | "flag" | null
  >(null);
  const [job, setJob] = useState<JobType | null>();
  const [maintab, setMainTab] = useState("live");
  const [subtab, setSubTab] = useState("");
  const { user } = useContext(AuthContext);
  const [filters, setFilters] = useState<FilterType>({
    queriedFrom: null,
    status: ["QUERYRECEIVED", "QUOTEDTOCLIENT", "ORDERCONFIRMED"],
    search: "",
    queriedUpto: null,
    quotedFrom: null,
    quotedUpto: null,
    type: null,
    assignedTo: null,
  });

  useEffect(() => {
    if (maintab === "live") {
      setFilters((f) => ({
        ...f,
        status: ["QUERYRECEIVED", "QUOTEDTOCLIENT", "ORDERCONFIRMED"],
      }));
    } else if (maintab === "cancelled") {
      setFilters((filters) => ({
        ...filters,
        status: "JOBCANCELLED",
      }));
    } else if (maintab === "history") {
      setFilters((filters) => ({
        ...filters,
        status: "JOBCOMPLETED",
      }));
    }
  }, [maintab]);

  useEffect(() => {
    if (subtab === "queryreceived") {
      setFilters((filters) => ({
        ...filters,
        status: "QUERYRECEIVED",
      }));
    } else if (subtab === "quotedtoclient") {
      setFilters((filters) => ({
        ...filters,
        status: "QUOTEDTOCLIENT",
      }));
    } else if (subtab === "orderconfirmed") {
      setFilters((filters) => ({
        ...filters,
        status: "ORDERCONFIRMED",
      }));
    } else if (subtab === "jobcompleted") {
      setFilters((filters) => ({
        ...filters,
        status: "JOBCOMPLETED",
      }));
    }
  }, [subtab]);

  const actions = [
    {
      icon: <IoMdEye />,
      name: "View",
      onClick: (params: any) => {
        setJob(realData.find((item) => item.id === params.id));
        setModal("view");
      },
    },
    {
      icon: <BiPencil />,
      name: "Edit",
      onClick: (params: any) => {
        setJob(realData.find((item) => item.id === params.id));
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
    refresh,
    data: realData,
  } = useSalesTable({
    filters,
    renderActions,
  });

  return (
    <DashboardLayout header sidebar>
      <Fab
        variant="extended"
        className="bg-blue-600 text-white"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        color="primary"
        onClick={() => {
          setModal("create");
        }}
      >
        <MdAdd className="mr-2" />
        Add Job
      </Fab>
      <ToggleButtonGroup
        color="primary"
        value={maintab}
        exclusive
        onChange={(e, value) => {
          if (value) setMainTab(value);
        }}
      >
        {mainTabs.map((tab) => (
          <ToggleButton value={tab.value} key={tab.value}>
            {tab.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div className="my-4 flex flex-col gap-3">
        <Search placeholder="Enter Job Code to search.." />
        {maintab === "live" && (
          <ToggleButtonGroup
            color="primary"
            value={subtab}
            exclusive
            onChange={(e, value) => {
              setSubTab(value);
            }}
          >
            {subTabs.map((tab) => (
              <ToggleButton value={tab.value} key={tab.value}>
                {tab.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      </div>
      <div className="mb-4">
        <Filters setFilters={setFilters} />
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
              callback={refresh}
              authData={user}
              mode="create"
              onClose={() => setModal(null)}
            />
          )}
          {modal === "edit" && (
            <JobOrderForm
              callback={refresh}
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
