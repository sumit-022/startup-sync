import { useEffect, useState } from "react";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import { GridColDef } from "@mui/x-data-grid";
import qs from "qs";

export default function useSalesTable({
  status,
  search,
  renderActions,
}: {
  status: JobStatus[] | JobStatus;
  search: string;
  renderActions?: (params: any) => React.ReactNode;
}) {
  const [rows, setRows] = useState<JobType[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const query = qs.stringify(
    {
      filters: {
        status:
          typeof status === "string" ? { $eq: status } : { $contains: status },
      },
    },
    { encodeValuesOnly: true }
  );

  console.log({ query });

  useEffect(() => {
    refresh();
  }, [status, search]);

  const refresh = () => {
    const route = status ? `/jobs?${query}&populate=*` : "/jobs?populate=*";
    setLoading(true);
    instance
      .get(route)
      .then((res: any) => {
        setData(res.data.data);
        setRows(
          parseAttributes(res.data.data).map((el: any) =>
            Object.fromEntries(
              Object.entries(el).map(([x, y]: [string, any]) => {
                if (x == "assignedTo") return [x, y.fullname];
                return [x, y];
              })
            )
          )
        );
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const columns: GridColDef[] = [
    { field: "jobCode", headerName: "Job Code", width: 130 },
    { field: "description", headerName: "Job Description", width: 200 },
    { field: "quotedAt", headerName: "Quoted Date", width: 150 },
    { field: "receivedAt", headerName: "Received Date", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "assignedTo", headerName: "Assigned To", width: 150 },
    {
      field: "Action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => (
        <div className="flex justify-center">
          {renderActions && renderActions(params)}
        </div>
      ),
    },
  ];

  return { columns, rows, loading, data, refresh };
}
