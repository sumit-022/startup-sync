import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const FormInputText = ({
  name,
  label,
  control,
  className,
  disabled,
  multiline,
  rows,
  type,
  required,
}: {
  name: string;
  label: string;
  control: any;
  disabled?: boolean;
  multiline?: boolean;
  className?: string;
  rows?: number;
  type?: "text" | "password";
  required?: boolean;
}) => {
  return (
    <Controller
      name={name}
      rules={{ required: required ? "This field is required" : false }}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          variant="outlined"
          multiline={multiline}
          rows={rows}
          onChange={onChange}
          disabled={disabled}
          type={type}
          value={value}
          error={!!error}
          className={className}
          helperText={error ? error.message : null}
        />
      )}
    />
  );
};

export default FormInputText;
