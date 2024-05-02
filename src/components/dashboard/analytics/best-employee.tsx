import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Box, Typography } from "@mui/material";
import instance from "@/config/axios.config";
import axios from "axios";

const BestEmployee = () => {
  const [bestEmployee, setBestEmployee] = useState<any>(null);
  const [employeeData, setEmployeeData] = useState<any>(null);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const res = await instance.get("/job/stats/employee");
        setEmployeeData(res.data.employees);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    if (employeeData) {
      const Percentage = employeeData.map(
        (employee: any) =>
          (employee.confirmed_count / employee.total_count) * 100
      );
      const Duration = employeeData.map(
        (employee: any) => employee.avg_quote_time
      );
      const Price = employeeData.map((employee: any) => employee.total_revenue);
      const Employee = employeeData.map((employee: any) => employee.username);

      const fetchBestEmployee = async () => {
        try {
          const res = await axios.post(
            "http://127.0.0.1:5000/predict-employee",
            {
              Percentage,
              Duration,
              Price,
              Employee,
            }
          );
          setBestEmployee(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchBestEmployee();
    }
  }, [employeeData]);

  console.log({ bestEmployee });

  return (
    <div style={{ marginTop: "20px" }}>
      <Card
        sx={{
          p: 2,
          backgroundColor: "#f0f0f0", // Light gray background
          borderRadius: "12px", // Rounded corners
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Shadow
        }}
      >
        <CardHeader
          title="Best Employee"
          sx={{
            backgroundColor: "#2196f3", // Blue header background
            color: "#fff", // White text color
            borderRadius: "12px 12px 0 0", // Rounded top corners
          }}
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Typography variant="body1" sx={{ color: "#616161" }}>
              Employee of the Month
            </Typography>
            <Typography variant="body1">Sumit</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Typography variant="body1" sx={{ color: "#616161" }}>
              Total Orders
            </Typography>
            <Typography variant="body1">100</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Typography variant="body1" sx={{ color: "#616161" }}>
              Total Orders Completed
            </Typography>
            <Typography variant="body1">90</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ color: "#616161" }}>
              Total Revenue
            </Typography>
            <Typography variant="body1">$1000</Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default BestEmployee;
