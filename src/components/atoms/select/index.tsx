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
  value?: string;
  onChange?: (event: SelectChangeEvent) => void;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProperties> = ({
  label,
  placeholder,
  disabled,
  options,
  className,
  onChange,
  value,
}) => {
  return (
    <FormControl className="myclass">
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        id="demo-simple-select"
        value={value}
        onChange={onChange}
        label={label}
        className={clsx("text-black", className)}
        disabled={disabled}
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
