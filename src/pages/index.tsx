import React, { useContext } from "react";
import DashboardLayout from "@/components/layout";
import AuthContext from "@/context/AuthContext";
import { Truculenta } from "next/font/google";
import clsx from "clsx";
import LineChart from "@/components/charts/orderconversion";
import BarChart from "@/components/charts/bar";
import PieChart from "@/components/charts/pie";

const truculenta = Truculenta({ subsets: ["latin-ext"] });

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const time = new Date().getHours();
  return (
    <DashboardLayout header sidebar>
      <h1
        className={clsx("font-semibold text-2xl", truculenta.className)}
      >{`Good ${time < 12 ? "Morning" : time < 18 ? "Afternoon" : "Evening"}, ${
        user?.fullname.split(" ")[0]
      }`}</h1>
      <div className="grid grid-cols-2 grid-rows-[500px,500px] justify-center gap-8 w-full">
        <LineChart />
        <BarChart />
        <PieChart className="col-span-2" />
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
