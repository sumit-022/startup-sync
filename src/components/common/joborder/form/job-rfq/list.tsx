import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

const RFQList = () => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "RFQ Number",
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "firstName",
      headerName: "Release Date",
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "Status",
      minWidth: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "supplierName",
      headerName: "Supplier Name",
      minWidth: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
  ];
  return (
    <DataGrid
      rows={[]}
      sx={{ mt: 4 }}
      columns={columns}
      pagination
      getRowClassName={(params) => {
        return params.row.id % 2 ? "bg-gray-100" : "";
      }}
      autoHeight
    />
  );
};

export default RFQList;
