import React from "react";
import DashboardLayout from "@/components/layout";
import { DataGrid } from "@mui/x-data-grid";
import usePurchaseTable from "@/hooks/purchase-table";
import {
  Box,
  SpeedDial,
  SpeedDialAction,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { MdAdd } from "react-icons/md";
import { SiGoogleforms } from "react-icons/si";
import RFQDialog from "@/components/atoms/button/job-rfq";

type PurchaseTableFilter = {
  status: string;
};

export default function Home() {
  const [filters, setFilters] = React.useState<PurchaseTableFilter>({
    status: "",
  });
  const { columns, rows, loading } = usePurchaseTable({
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

  const [RFQOpen, setRFQOpen] = React.useState(false);

  const actions = [
    { icon: <MdAdd />, name: "Create an RFQ", onClick: () => setRFQOpen(true) },
    { icon: <SiGoogleforms />, name: "Create a PO" },
  ];

  return (
    <DashboardLayout header sidebar>
      <Box sx={{ height: 500, width: "100%" }}>
        <ToggleButtonGroup
          sx={{ mb: 2 }}
          color="primary"
          value={filters.status}
          exclusive
          onChange={handleFilter}
        >
          <ToggleButton value="QUERYRECEIVED">Query</ToggleButton>
          <ToggleButton value="RFQSENT">RFQ Sent</ToggleButton>
        </ToggleButtonGroup>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Box>
      <SpeedDial
        ariaLabel="Create"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<MdAdd className="text-xl" />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      <RFQDialog open={RFQOpen} setOpen={setRFQOpen} />
    </DashboardLayout>
  );
}
