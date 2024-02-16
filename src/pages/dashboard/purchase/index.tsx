import React from "react";
import DashboardLayout from "@/components/layout";
import { DataGrid } from "@mui/x-data-grid";
import usePurchaseTable from "@/hooks/purchase-table";
import IconButton from "@/components/atoms/button/icon-button";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MdAdd } from "react-icons/md";
import RFQDialog from "@/components/atoms/button/job-rfq";
import Button from "@/components/atoms/button";
import { useRouter } from "next/router";

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
      : [
          {
            icon: <MdAdd />,
            name: "Update Quotes",
            onClick: (params: any) => {
              const job = rows.data.find((el) => el.id == params.row.id);
              job &&
                router.push(
                  `/dashboard/purchase/quotes/update/RFQ-${job.jobCode}`
                );
            },
            className: "bg-green-500 hover:bg-green-600",
          },
        ];
  const renderActions = (params: any) => {
    return actions.map((action) => (
      <Button
        key={action.name}
        className="text-xs"
        onClick={() => action.onClick(params)}
      >
        {action.icon}
        {action.name}
      </Button>
    ));
  };
  const { columns, rows, loading, page } = usePurchaseTable({
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
    </DashboardLayout>
  );
}
