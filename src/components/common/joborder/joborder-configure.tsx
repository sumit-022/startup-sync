import React from "react";
import { Checkbox } from "@mui/material";

interface Props {
  availableHeaders: {
    name: string;
    show: boolean;
  }[];
  setSelectedHeaders: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        show: boolean;
      }[]
    >
  >;
}

const ConfigureForm: React.FC<Props> = ({
  availableHeaders,
  setSelectedHeaders,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {availableHeaders.map((header, index) => (
        <div key={index} className="flex items-center">
          <Checkbox
            onChange={() => {
              setSelectedHeaders((prev) => {
                const newHeaders = [...prev];
                newHeaders[index].show = !newHeaders[index].show;

                return newHeaders;
              });
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
