import { useEffect, useState } from "react";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import { GridColDef } from "@mui/x-data-grid";
import GenerateRFQButton from "@/components/atoms/button/job-rfq";

export default function usePurchaseTable() {
  const [rows, setRows] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    instance
      .get("/jobs?populate=*")
      .then((res) => {
        console.log(parseAttributes(res.data.data));
        setRows(
          parseAttributes(res.data.data).map((el: any) =>
            Object.fromEntries(
              Object.entries(el).map(([x, y]: [string, any]) => {
                if (x == "assignedTo")
                  return [x, { ...y, assignedTo: y?.assignedTo?.fullname }];
                return [x, y];
              })
            )
          )
        );
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  const columns: GridColDef[] = [
    { field: "jobCode", headerName: "Job Code", width: 130 },
    { field: "description", headerName: "Job Description", width: 200 },
    { field: "quotedAt", headerName: "Quoted Date", width: 150 },
    { field: "receivedAt", headerName: "Received Date", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "assignedTo", headerName: "Assigned To", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <GenerateRFQButton job={rows.find((row) => row.id === params.id)!} />
      ),
    },
  ];

  return { columns, rows, loading };
}
