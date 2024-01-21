import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { Controller, FieldValues, RegisterOptions } from "react-hook-form";

const FormInputSelect = ({
  id,
  name,
  control,
  options,
  label,
  fullWidth,
  className,
  disabled,
  rules,
}: {
  id: string;
  name: string;
  control: any;
  options: { id: any; name: string }[];
  label: string;
  className?: string;
  fullWidth?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
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
    <FormControl>
      <InputLabel id={id}>{label}</InputLabel>
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select
            label={label}
            disabled={disabled}
            fullWidth={fullWidth}
            value={value}
            onChange={onChange}
            id={id}
            className={className}
            error={!!error}
          >
            {generateSingleOptions()}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default FormInputSelect;
