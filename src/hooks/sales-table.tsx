import { useEffect, useState } from "react";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import { GridColDef } from "@mui/x-data-grid";
import qs from "qs";

export default function useSalesTable({
  filters,
  renderActions,
}: {
  filters: FilterType;
  renderActions?: (params: any) => React.ReactNode;
}) {
  const [rows, setRows] = useState<JobType[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const query = qs.stringify(
    {
      filters: {
        status:
          typeof filters.status === "string"
            ? { $eq: filters.status }
            : { $contains: filters.status },
      },
      quotedAt: {
        $gte: filters.queriedFrom,
        $lte: filters.queriedUpto,
      },
    },
    { encodeValuesOnly: true }
  );

  useEffect(() => {
    refresh();
  }, [filters]);

  const refresh = () => {
    setLoading(true);
    instance
      .get(`/jobs?${query}&populate=*`)
      .then((res: any) => {
        setData(parseAttributes(res.data.data));
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
