import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const FormInputSelect = ({
  id,
  name,
  control,
  options,
  label,
  className,
  disabled,
  multiple = false,
}: {
  id: string;
  name: string;
  control: any;
  options: { id: any; name: string }[];
  label: string;
  className?: string;
  multiple?: boolean;
  disabled?: boolean;
}) => {
  const generateSingleOptions = () => {
    return options.map(
      (
        option: {
          id: any;
          name: string;
        },
        index
      ) => {
        return (
          <MenuItem key={index} value={option.id}>
            {option.name}
          </MenuItem>
        );
      }
    );
  };
  return (
    <FormControl className="myclass w-full">
      <InputLabel id={id}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={label}
            multiple={multiple}
            disabled={disabled}
            value={value}
            onChange={onChange}
            id={id}
            className={className}
          >
            {generateSingleOptions()}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default FormInputSelect;
