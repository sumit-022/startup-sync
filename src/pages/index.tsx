import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "@/components/layout";
import AuthContext from "@/context/AuthContext";
import { Truculenta } from "next/font/google";
import clsx from "clsx";
import BarChart from "@/components/charts/bar/service-cordinators";
import useStats from "@/hooks/useStats";

const truculenta = Truculenta({ subsets: ["latin-ext"] });

const HomePage = () => {
  const serviceCoordinators = [13];

  const { user } = useContext(AuthContext);

  const [filters, setFilters] = useState<{
    startDate: string;
    endDate: string;
    userId: number | null;
  }>({
    startDate: new Date("2024-01-01").toISOString(),
    endDate: new Date("2024-12-31").toISOString(),
    userId: 0,
  });

  const { stats, loading } = useStats({
    startDate: filters.startDate,
    endDate: filters.endDate,
    all: filters.userId === 0,
    userId: filters.userId ?? undefined,
  });

  console.log({ stats, loading });

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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <BarChart
            data={{
              labels: months,
              datasets: [
                {
                  label: "Order Created",
                  data: [
                    0,
                    ...Object.keys(stats.aggregate).map(
                      (key) => stats.aggregate[key].created
                    ),
                  ],
                },
                {
                  label: "Order Quoted",
                  data: [
                    0,
                    ...Object.keys(stats.aggregate).map(
                      (key) => stats.aggregate[key].quoted
                    ),
                  ],
                },
                {
                  label: "Order Confirmed",
                  data: [
                    0,
                    ...Object.keys(stats.aggregate).map(
                      (key) => stats.aggregate[key].confirmed
                    ),
                  ],
                },
              ],
            }}
            title="Stats for Service Coordinators"
            onChange={(year, userId) => {
              setFilters({
                ...filters,
                startDate: new Date(`${year}-01-01`).toISOString(),
                endDate: new Date(`${year}-12-31`).toISOString(),
                userId,
              });
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
