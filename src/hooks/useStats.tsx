import React, { useEffect, useState } from "react";
import instance from "@/config/axios.config";

export default function useStats({
  startDate,
  endDate,
  userId,
  all = false,
}: {
  startDate: string;
  endDate: string;
  userId?: string | number | undefined;
  all?: boolean;
}) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      if (!startDate || !endDate) {
        throw new Error("Please provide start and end date");
      }
      if (!userId && !all) {
        throw new Error("Please provide userId");
      }
      const res = await instance.get(
        !all
          ? `/jobs/stats?startDate=${startDate}&endDate=${endDate}&userId=${userId}&aggregate=month`
          : `/jobs/stats?startDate=${startDate}&endDate=${endDate}&aggregate=month`
      );
      console.log(res.data);
      setStats(res.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [startDate, endDate, userId]);

  return { stats, loading, error, fetchStats };
}
