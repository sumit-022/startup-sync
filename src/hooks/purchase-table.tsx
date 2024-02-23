import { useEffect, useState } from "react";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import { GridColDef } from "@mui/x-data-grid";
import qs from "qs";
import IconButton from "@/components/atoms/button/icon-button";
import { useSearchParams } from "next/navigation";

export default function usePurchaseTable({
  status,
  renderActions,
}: {
  status: string | null;
  renderActions?: (params: any) => React.ReactNode;
}) {
  const [rows, setRows] = useState<{
    total: number;
    data: JobType[];
  }>({
    total: 0,
    data: [],
  });
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const query = qs.stringify(
    {
      sort: "jobCode:desc",
      filters: {
        purchaseStatus: {
          $eq: status,
        },
      },
      pagination: {
        page,
        pageSize: 10,
      },
    },
    { encodeValuesOnly: true }
  );

  useEffect(() => {
    const route = status ? `/jobs?${query}&populate=*` : "/jobs?populate=*";
    setLoading(true);
    instance
      .get(route)
      .then((res: any) => {
        console.log(res);

        setRows({
          total: res.data.meta.pagination.total,
          data: parseAttributes(res.data.data).map((el: any) =>
            Object.fromEntries(
              Object.entries(el).map(([x, y]: [string, any]) => {
                if (x == "assignedTo") return [x, y.fullname];
                return [x, y];
              })
            )
          ),
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [status, page]);
  const columns: GridColDef[] = [
    { field: "jobCode", headerName: "Job Code", width: 130, flex: 0.3 },
    {
      field: "description",
      headerName: "Job Description",
      width: 200,
      flex: 0.5,
    },
    { field: "receivedAt", headerName: "Received Date", width: 150, flex: 0.3 },
    { field: "type", headerName: "Type", width: 150, flex: 0.3 },
    { field: "assignedTo", headerName: "Assigned To", width: 150, flex: 0.3 },
    {
      field: "Action",
      headerName: "Action",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center items-center w-full gap-4">
          {renderActions && renderActions(params)}
        </div>
      ),
      flex: 0.2,
    },
  ];

  return { columns, rows, loading, page };
}
