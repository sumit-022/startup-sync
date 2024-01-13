import React from "react";
import DashboardLayout from "@/components/layout";
import { DataGrid } from "@mui/x-data-grid";
import usePurchaseTable from "@/hooks/purchase-table";
import { Box, Typography } from "@mui/material";

export default function Home() {
  const { columns, rows, loading } = usePurchaseTable();
  return (
    <DashboardLayout header sidebar>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          loading={loading}
        />
      </Box>
    </DashboardLayout>
  );
}
