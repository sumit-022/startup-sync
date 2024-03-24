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
    all: true,
  });

  const { stats: userStats, loading: userStatsLoading } = useStats({
    startDate: new Date("2024-01-01").toISOString(),
    endDate: new Date("2024-12-31").toISOString(),
    userId: user?.id,
  });

  const months = [
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
  ];
  const time = new Date().getHours();
  return (
    <DashboardLayout header sidebar>
      <h1
        className={clsx("font-semibold text-2xl", truculenta.className)}
      >{`Good ${time < 12 ? "Morning" : time < 18 ? "Afternoon" : "Evening"}, ${
        user?.fullname.split(" ")[0]
      }`}</h1>
      <div className="mt-8">
        {!userStatsLoading && userStats && (
          <BarChart
            data={{
              labels: months,
              datasets: [
                {
                  label: "Order Created",
                  data: [
                    0,
                    ...Object.keys(userStats.aggregate).map(
                      (key) => userStats.aggregate[key].created
                    ),
                  ],
                },
                {
                  label: "Order Quoted",
                  data: [
                    0,
                    ...Object.keys(userStats.aggregate).map(
                      (key) => userStats.aggregate[key].quoted
                    ),
                  ],
                },
                {
                  label: "Order Confirmed",
                  data: [
                    0,
                    ...Object.keys(userStats.aggregate).map(
                      (key) => userStats.aggregate[key].confirmed
                    ),
                  ],
                },
              ],
            }}
            title="Personalized Stats"
          />
        )}
        {!overallStatsLoading && overallStats && (
          <BarChart
            data={{
              labels: months,
              datasets: [
                {
                  label: "Order Created",
                  data: [
                    0,
                    ...Object.keys(overallStats.aggregate).map(
                      (key) => overallStats.aggregate[key].created
                    ),
                  ],
                },
                {
                  label: "Order Quoted",
                  data: [
                    0,
                    ...Object.keys(overallStats.aggregate).map(
                      (key) => overallStats.aggregate[key].quoted
                    ),
                  ],
                },
                {
                  label: "Order Confirmed",
                  data: [
                    0,
                    ...Object.keys(overallStats.aggregate).map(
                      (key) => overallStats.aggregate[key].confirmed
                    ),
                  ],
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
