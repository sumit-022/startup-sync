import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";

interface SelectInputProperties {
  label: string;
  placeholder?: string;
  options: string[];
}

const SelectInput: React.FC<SelectInputProperties> = ({
  label,
  placeholder,
  options,
}) => {
  return (
    <div className="w-full h-full text-black flex gap-1 flex-col">
      {label && (
        <label className="font-semibold text-left text-black">{label}</label>
      )}
      <Select
        id="demo-simple-select"
        onChange={(event: SelectChangeEvent) => {
          console.log(event.target.value);
        }}
        className="w-full text-black"
      >
        {options.map((option, index) => (
          <MenuItem value={option} key={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectInput;
