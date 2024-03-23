import React, { useState } from "react";
import instance from "@/config/axios.config";

export default function useStats({
  startDate,
  endDate,
  userId,
}: {
  startDate: string;
  endDate: string;
  userId: string | number;
}) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await instance.get(
        `/jobs/stats?startDate=${startDate}&endDate=${endDate}&userId=${userId}`
      );
      setStats(res.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, fetchStats };
}
