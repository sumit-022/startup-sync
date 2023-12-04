import { Button } from "@mui/material";
import React from "react";

interface Props {
  allcount: string;
  querycount: string;
  qoutedcount: string;
}

const Tabs: React.FC<Props> = ({ allcount, querycount, qoutedcount }) => {
  const buttons = [
    {
      name: "Query",
      count: allcount,
    },
    {
      name: "Quoted",
      count: qoutedcount,
    },
    {
      name: "Order Confirmed",
      count: querycount,
    },
    {
      name: "Job Completed",
      count: querycount,
    },
  ];
  return (
    <div className="flex gap-4">
      {buttons.map((item, index) => {
        return (
          <Button
            key={index}
            variant="contained"
            className="bg-primary-bright-blue hover:bg-primary-bright-blue/105"
          >
            {item.name} ({item.count})
          </Button>
        );
      })}
    </div>
  );
};

export default Tabs;
