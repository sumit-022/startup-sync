import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import clsx from "clsx";

interface SelectInputProperties {
  label?: string;
  placeholder?: string;
  options: string[];
  className?: string;
}

const SelectInput: React.FC<SelectInputProperties> = ({
  label,
  placeholder,
  options,
  className,
}) => {
  return (
    <FormControl className="myclass">
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        id="demo-simple-select"
        onChange={(event: SelectChangeEvent) => {
          console.log(event.target.value);
        }}
        label={label}
        className={clsx("text-black", className)}
      >
        {options.map((option, index) => (
          <MenuItem value={option} key={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
