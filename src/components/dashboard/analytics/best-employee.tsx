import React from "react";
import { Card, CardContent, CardHeader, Box, Typography } from "@mui/material";

const BestEmployee = () => {
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
