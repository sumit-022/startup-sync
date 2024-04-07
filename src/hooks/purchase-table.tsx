import { useEffect, useState } from "react";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import { GridColDef } from "@mui/x-data-grid";
import qs from "qs";
import { useSearchParams } from "next/navigation";

export default function usePurchaseTable({
  status,
  renderActions,
  search,
}: {
  status: string | null;
  renderActions?: (params: any) => React.ReactNode;
  search: string;
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
        ...(search
          ? {
              $or: [
                { jobCode: { $contains: search } },
                { description: { $containsi: search } },
                { shipName: { $containsi: search } },
                { targetPort: { $containsi: search } },
                { type: { $containsi: search } },
                {
                  company: {
                    name: {
                      $containsi: search,
                    },
                  },
                },
              ],
            }
          : {}),
      },
      pagination: {
        page,
        pageSize: 10,
      },
    },
    { encodeValuesOnly: true }
  );

  useEffect(() => {
    refresh();
  }, [status, page, search]);
  const refresh = async () => {
    const route = status
      ? `/jobs?${query}&populate[0]=rfqs&populate[1]=assignedTo&populate[2]=company&populate[3]=spares.attachments`
      : "/jobs?populate[0]=rfqs&populate[1]=assignedTo&populate[2]=company&populate[3]=spares.attachments";
    setLoading(true);
    instance
      .get(route)
      .then((res: any) => {
        console.log(res);
        console.log(parseAttributes(res.data.data));

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
  };
  const columns: GridColDef[] = [
    { field: "jobCode", headerName: "Job Code", width: 130, flex: 0.3 },
    {
      field: "description",
      headerName: "Job Description",
      width: 200,
      flex: 0.5,
    },
    { field: "receivedAt", headerName: "Received Date", width: 150, flex: 0.3 },
    {
      field: "response",
      headerName: "Responses",
      width: 150,
      flex: 0.3,
      renderCell: (params) => {
        const uniqueResponses = new Set(
          params.row.rfqs.map((el: any) => el.vendor.name)
        );
        const uniqueFilledResponses = new Set(
          params.row.rfqs
            .filter((el: any) => el.filled)
            .map((el: any) => el.vendor.name)
        );
        return `${uniqueFilledResponses.size} / ${uniqueResponses.size}`;
      },
    },
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

  return { columns, rows, loading, page, refresh };
}
