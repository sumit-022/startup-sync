import RFQList from "@/components/common/joborder/form/job-rfq/list";
import DashboardLayout from "@/components/layout";
import { Tab, Tabs, Typography } from "@mui/material";
import React from "react";

const PurchaseJobDetails = () => {
  const [value, setValue] = React.useState(0);
  return (
    <DashboardLayout header sidebar>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        selectionFollowsFocus
      >
        <Tab label="Quote Comparision" />
        <Tab label="Purchase Orders" />
      </Tabs>
      {(() => {
        switch (value) {
          case 1:
            return <Typography>Purchase Orders</Typography>;
          case 2:
            return <Typography>Quote Comparision</Typography>;
          default:
            return <Typography>RFQ List</Typography>;
        }
      })()}
    </DashboardLayout>
  );
};

export default PurchaseJobDetails;
