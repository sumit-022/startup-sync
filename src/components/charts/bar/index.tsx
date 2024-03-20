import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js/auto";
import { Card, CardContent, CardHeader } from "@mui/material";
interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

const options: ChartOptions<"bar"> = {
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export default function BarChart({
  data,
  title,
}: {
  data: ChartData;
  title: string;
}) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Bar data={data} options={options} height={100} />
      </CardContent>
    </Card>
  );
}
