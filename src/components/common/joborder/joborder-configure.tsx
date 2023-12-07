import React from "react";
import { Checkbox } from "@mui/material";

interface Props {
  availableHeaders: {
    name: string;
    show: boolean;
  }[];
}

const ConfigureForm: React.FC<Props> = ({ availableHeaders }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {availableHeaders.map((header, index) => (
        <div key={index} className="flex items-center">
          <Checkbox
            onChange={() => {
              availableHeaders[index].show = !header.show;
              console.log(availableHeaders);
            }}
            checked={header.show}
          />
          <span>{header.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ConfigureForm;
