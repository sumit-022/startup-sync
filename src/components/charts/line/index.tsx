import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import transactionData from "@/data/csvjson.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { Card, CardContent, CardHeader } from "@mui/material";
import axios from "axios";

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

export default function LineChart() {
  const [cordinates, setCordinates] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const res = await axios.post("http://127.0.0.1:5000/predict-sales", {
          days: 15,
        });
        setCordinates(res.data);
      } catch (error) {}
    };
    fetchTransactionData();
  }, []);

  console.log({ cordinates, transactionData });
  const data = {
    labels: transactionData
      .map((item: any) => item.Date.split("-")[0])
      .concat(cordinates[1]?.map((item: any) => item.split(" ")[1])),
    datasets: [
      {
        label: "Actual Sales",
        data: transactionData.map((item: any) => item.TransactionAmount),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Forecasted Sales",
        data: Array(transactionData.length)
          .fill(null)
          .concat(cordinates[0]?.map((item: any) => item[0])),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
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

  return (
    <Card>
      <CardHeader title="Sales Analytics" />
      <CardContent sx={{ height: 400 }}>
        <Line data={data} options={options} height={300} />;
      </CardContent>
    </Card>
  );
}
