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

  const { stats: UserStats, loading: userStatsLoading } = useStats({
    startDate: new Date("2024-01-01").toISOString(),
    endDate: new Date("2024-12-31").toISOString(),
    userId: user?.id,
  });

  console.log({ overallStats, UserStats });

  const time = new Date().getHours();
  return (
    <DashboardLayout header sidebar>
      <h1
        className={clsx("font-semibold text-2xl", truculenta.className)}
      >{`Good ${time < 12 ? "Morning" : time < 18 ? "Afternoon" : "Evening"}, ${
        user?.fullname.split(" ")[0]
      }`}</h1>
      <div className="mt-8">
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
                label: "Overall Stats",
                data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 1],
              },
              {
                label: "Cordinator Stats",
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
              },
              {
                label: "User Stats",
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
              },
            ],
          }}
          title="Overall Stats"
        />
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
