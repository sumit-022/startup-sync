import React, { useEffect, useState } from "react";
import instance from "@/config/axios.config";

export default function useStats({
  startDate,
  endDate,
  userId,
}: {
  startDate: string;
  endDate: string;
  userId?: string | number | undefined;
}) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      if (!startDate || !endDate) {
        throw new Error("Please provide start and end date");
      }
      if (userId === undefined) {
        throw new Error("Please provide user id");
      }
      const res = await instance.get(
        `/jobs/stats?startDate=${startDate}&endDate=${endDate}&userId=${userId}&aggregate=month`
      );
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
