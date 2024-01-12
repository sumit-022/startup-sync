import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { useSearchParams } from "next/navigation";
import instance from "@/config/axios.config";

interface TableProps {
  baseUrl: string;
}

type Data = {
    total: number;
    totalPages: number;
    columns: GridColDef[];
    rows: GridRowsProp;
  };

const Table = ({ baseUrl }: TableProps) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const apiqueries = qs.stringify(
    {
      pagination: {
        page,
        pageSize: 10,
      },
      populate: ["*"],
    },
    {
      encodeValuesOnly: true,
    }
  );
    const [loading, setLoading] = useState(false);
    
};

export default Table;
