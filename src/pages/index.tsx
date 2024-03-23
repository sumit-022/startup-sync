import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "@/components/layout";
import AuthContext from "@/context/AuthContext";
import { Truculenta } from "next/font/google";
import clsx from "clsx";
import BarChart from "@/components/charts/bar";
import instance from "@/config/axios.config";
import useStats from "@/hooks/useStats";

const truculenta = Truculenta({ subsets: ["latin-ext"] });

const HomePage = () => {
  const { user } = useContext(AuthContext);
  // const { stats } = useStats({
  //   startDate: "2021-01-01",
  //   endDate: "2021-12-31",
  //   userId: user?.id,
  // });

  const time = new Date().getHours();
  return (
    <DashboardLayout header sidebar>
      <h1
        className={clsx("font-semibold text-2xl", truculenta.className)}
      >{`Good ${time < 12 ? "Morning" : time < 18 ? "Afternoon" : "Evening"}, ${
        user?.fullname.split(" ")[0]
      }`}</h1>
      <div className="mt-8"></div>
    </DashboardLayout>
  );
};

export default HomePage;
