import { useState, useEffect } from "react";
import instance from "@/config/axios.config";
import { AxiosError } from "axios";
import parseAttributes from "@/utils/parse-data";

export default function useStats(
  startDate: Date,
  endDate: Date,
  userId?: number
) {
  const [stats, setStats] = useState<{
    data: any;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  const updateStats = async () => {
    try {
      const res = await instance.get(
        `/jobs/stats?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&userId=${userId}&aggregate=month`
      );
      setStats({
        data: res.data,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setStats({
        data: null,
        loading: false,
        error: (error as AxiosError).message,
      });
    } finally {
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };
  useEffect(() => {
    updateStats();
  }, []);

  return stats;
}
