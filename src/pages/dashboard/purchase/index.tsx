import React from "react";
import DashboardLayout from "@/components/layout";
import { DataGrid } from "@mui/x-data-grid";
import usePurchaseTable from "@/hooks/purchase-table";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { MdAdd } from "react-icons/md";
import RFQDialog from "@/components/atoms/button/job-rfq";
import { useRouter } from "next/router";
import { IoMdEye } from "react-icons/io";
import LongMenu from "@/components/atoms/dropdown/menu";
import UpdateModal from "@/components/common/purchaseorder/modal/update";
import instance from "@/config/axios.config";
import { useCurrency } from "@/context/CurrencyContext";

type PurchaseTableFilter = {
  status: string;
};

export default function Home() {
  const router = useRouter();
  const [filters, setFilters] = React.useState<PurchaseTableFilter>({
    status: "QUERYRECEIVED",
  });
  const actions =
    filters.status == "QUERYRECEIVED"
      ? [
          {
            icon: <MdAdd />,
            name: "Create an RFQ",
            onClick: (params: any) => {
              setRFQOpen(true);
              const job = rows.data.find((el) => el.id == params.row.id);
              job && setJob(job);
            },
            className: "bg-green-500 hover:bg-green-600",
          },
        ]
      : filters.status == "RFQSENT"
      ? [
          {
            icon: <MdAdd />,
            name: "Update Quotes",
            onClick: (params: any) => {
              setUpdateOpen(true);
              setJobCode(params.row.jobCode);
            },
            className: "bg-green-500 hover:bg-green-600",
          },
          {
            icon: <IoMdEye />,
            name: "Compare Quotes",
            onClick: (params: any) => {
              const job = rows.data.find((el) => el.id == params.row.id);
              job &&
                router.push(`/dashboard/purchase/quotes/RFQ-${job.jobCode}`);
            },
            className: "bg-green-500 hover:bg-green-600",
          },
        ]
      : [
          {
            icon: <MdAdd />,
            name: "View Quotes",
            onClick: (params: any) => {
              router.push(
                `/dashboard/purchase/quotes/view/RFQ-${params.row.jobCode}`
              );
            },
            className: "bg-green-500 hover:bg-green-600",
          },
          {
            icon: <IoMdEye />,
            name: "Mark Purchase Complete",
            onClick: (params: any) => {
              const job = rows.data.find((el) => el.id == params.row.id);
              job && setPurchaseCompleted({ open: true, id: `${job.id}` });
            },
            className: "bg-green-500 hover:bg-green-600",
          },
        ];
  const renderActions = (params: any) => (
    <LongMenu options={actions} params={params} />
  );
  const { columns, rows, loading, page, refresh } = usePurchaseTable({
    renderActions,
    status: filters.status,
  });
  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: any
  ) => {
    setFilters({ ...filters, status: newFilter });
    setFilters({
      ...filters,
      status: newFilter,
    });
  };

  const [RFQOpen, setRFQOpen] = React.useState(true);
  const [job, setJob] = React.useState<JobType | null>(null);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [jobCode, setJobCode] = React.useState<string | null>(null);
  const [purchaseComplted, setPurchaseCompleted] = React.useState({
    open: false,
    id: "",
  });

  const handlePurchaseComplete = (id: string) => {
    instance
      .put(`/jobs/${id}`, {
        data: { purchaseStatus: "COMPLETED" },
      })
      .then(() => {
        refresh();
      });
  };

  const myRate = useCurrency("USD");
  console.log({ myRate });

  return (
    <DashboardLayout header sidebar>
      <Box sx={{ height: 400, width: "100%" }}>
        <ToggleButtonGroup
          sx={{ mb: 2 }}
          color="primary"
          value={filters.status}
          exclusive
          onChange={handleFilter}
        >
          <ToggleButton value="QUERYRECEIVED">Query</ToggleButton>
          <ToggleButton value="RFQSENT">RFQ Sent</ToggleButton>
          <ToggleButton value="POISSUED">PO Issued</ToggleButton>
          <ToggleButton value="COMPLETED">Completed</ToggleButton>
        </ToggleButtonGroup>
        <DataGrid
          rows={rows.data}
          rowCount={rows.total}
          scrollbarSize={20}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick
          paginationModel={{
            page: page - 1,
            pageSize: 10,
          }}
          pageSizeOptions={[10]}
          onPaginationModelChange={(params) => {
            router.push({
              pathname: router.pathname,
              query: { page: params.page + 1 },
            });
          }}
          pagination
          paginationMode="server"
        />
      </Box>
      {job && <RFQDialog open={RFQOpen} setOpen={setRFQOpen} job={job} />}
      {jobCode && (
        <UpdateModal
          open={updateOpen}
          onClose={() => setUpdateOpen(false)}
          jobCode={jobCode}
        />
      )}
      {purchaseComplted && (
        <Dialog
          open={purchaseComplted.open}
          onClose={() => setPurchaseCompleted({ open: false, id: "" })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Mark Purchase as Completed?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to mark this purchase as completed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setPurchaseCompleted({ open: false, id: "" });
              }}
            >
              Disagree
            </Button>
            <Button
              onClick={() => {
                handlePurchaseComplete(purchaseComplted.id);
                setPurchaseCompleted({ open: false, id: "" });
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
