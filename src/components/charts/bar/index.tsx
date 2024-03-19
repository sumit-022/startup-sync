import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader } from "@mui/material";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Sales",
      data: [3, 2, 2, 1, 5, 4, 7],
      fill: false,
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

export default function BarChart() {
  return (
    <Card>
      <CardHeader title="Sales" />
      <CardContent>
        <Bar data={data} options={options} height={400} />
      </CardContent>
    </Card>
  );
}
