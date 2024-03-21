import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "@/components/layout";
import AuthContext from "@/context/AuthContext";
import { Truculenta } from "next/font/google";
import clsx from "clsx";
import BarChart from "@/components/charts/bar";
import instance from "@/config/axios.config";

const truculenta = Truculenta({ subsets: ["latin-ext"] });

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [cordinationStats, setCordinationStats] = useState<{
    loading: boolean;
    error: boolean;
    data: any;
  }>({
    loading: true,
    error: false,
    data: {},
  });
  const startDate = new Date("2024-01-01");
  const endDate = new Date("2024-12-31");
  useEffect(() => {
    instance
      .get(
        `/jobs/stats?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&aggregate=month&userId=${
          user?.id
        }`
      )
      .then(({ data }) => {
        setCordinationStats({ loading: false, error: false, data });
      })
      .catch((error) => {
        setCordinationStats({ loading: false, error: true, data: {} });
      });
  }, []);

  const time = new Date().getHours();
  return (
    <DashboardLayout header sidebar>
      <h1
        className={clsx("font-semibold text-2xl", truculenta.className)}
      >{`Good ${time < 12 ? "Morning" : time < 18 ? "Afternoon" : "Evening"}, ${
        user?.fullname.split(" ")[0]
      }`}</h1>
      <div className="mt-8">
        {!cordinationStats.loading && !cordinationStats.error && (
          <BarChart
            title="Overall Order Conversion"
            data={{
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "Query Received",
                  data: [
                    0,
                    ...Object.values(cordinationStats.data.aggregate).map(
                      (item: any) => item.created
                    ),
                  ],
                  backgroundColor: "rgba(255, 99, 132)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Orders Confirmed",
                  data: [
                    0,
                    ...Object.values(cordinationStats.data.aggregate).map(
                      (item: any) => item.confirmed
                    ),
                  ],
                  backgroundColor: "rgba(54, 162, 235)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
