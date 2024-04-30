import React, { useContext, useState } from "react";
import DashboardLayout from "@/components/layout";
import AuthContext from "@/context/AuthContext";
import clsx from "clsx";
import BarChart from "@/components/charts/bar/service-cordinators";
import useStats from "@/hooks/useStats";
import PieChart from "@/components/charts/pie/top-companies";
import useCompanyStats from "@/hooks/useCompanyStats";
import { Truculenta } from "next/font/google";
import useSupplierStats from "@/hooks/useSupplierStats";
import Head from "next/head";
import SupplierPieChart from "@/components/charts/pie/supplier";

const truculenta = Truculenta({ subsets: ["latin-ext"] });

export default function HomePage() {
  const { user } = useContext(AuthContext);

  const [barFilters, setBarFilters] = useState<{
    startDate: string;
    endDate: string;
    userId: number | null;
  }>({
    startDate: new Date("2024-01-01").toISOString(),
    endDate: new Date("2024-12-31").toISOString(),
    userId: 0,
  });

  const [pieFilters, setPieFilters] = useState<{
    type: "SERVICES" | "SPARES SUPPLY" | "ALL";
    status: "QUERYRECIEVED" | "ORDERCONFIRMED";
  }>({
    type: "ALL",
    status: "QUERYRECIEVED",
  });

  const [supplierFilters, setSupplierFilters] = useState<{
    type: "SERVICES" | "SPARES SUPPLY" | "ALL";
  }>({
    type: "ALL",
  });

  const { stats, loading } = useStats({
    startDate: barFilters.startDate,
    endDate: barFilters.endDate,
    all: barFilters.userId === 0,
    userId: barFilters.userId ?? undefined,
  });

  const { stats: companyStats, loading: companyLoading } = useCompanyStats({
    type: pieFilters.type,
    status: pieFilters.status,
  });

  const { stats: supplierStats, loading: supplierLoading } = useSupplierStats({
    type: supplierFilters.type,
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
    <>
      <h1>hello </h1>
    </>
  );
}
