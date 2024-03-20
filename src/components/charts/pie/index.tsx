import React from "react";
import { Pie } from "react-chartjs-2";
import { Card, CardContent, CardHeader } from "@mui/material";
import clsx from "clsx";

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: ["red", "blue", "yellow"],
      borderColor: ["red", "blue", "yellow"],
      borderWidth: 1,
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
  aspectRatio: 1,
};

export default function PieChart({ className }: { className?: string }) {
  return (
    <Card className={clsx(className)}>
      <CardHeader title="Sales" />
      <CardContent>
        <Pie data={data} options={options} />
      </CardContent>
    </Card>
  );
}
