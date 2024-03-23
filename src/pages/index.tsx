import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "@/components/layout";
import AuthContext from "@/context/AuthContext";
import { Truculenta } from "next/font/google";
import clsx from "clsx";
import BarChart from "@/components/charts/bar";
import useStats from "@/hooks/useStats";

const truculenta = Truculenta({ subsets: ["latin-ext"] });

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { stats: overallStats, loading: overallStatsLoading } = useStats({
    startDate: new Date("2024-01-01").toISOString(),
    endDate: new Date("2024-12-31").toISOString(),
  });

  const { stats: userStats, loading: userStatsLoading } = useStats({
    startDate: new Date("2024-01-01").toISOString(),
    endDate: new Date("2024-12-31").toISOString(),
    userId: user?.id,
  });

  console.log({ overallStats, UserStats: userStats });

  const time = new Date().getHours();
  return (
    <DashboardLayout header sidebar>
      <h1
        className={clsx("font-semibold text-2xl", truculenta.className)}
      >{`Good ${time < 12 ? "Morning" : time < 18 ? "Afternoon" : "Evening"}, ${
        user?.fullname.split(" ")[0]
      }`}</h1>
      <div className="mt-8">
        {!userStatsLoading && (
          <BarChart
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
                  label: "Order Created",
                  data: Object.values(userStats.aggregate).map(
                    (el: any) => el.created
                  ),
                },
                {
                  label: "Order Quoted",
                  data: [0, 12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 8, 9],
                },
                {
                  label: "Order Confirmed",
                  data: [0, 12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 8, 9],
                },
              ],
            }}
            title="Overall Stats"
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
