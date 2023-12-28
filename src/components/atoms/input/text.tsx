import React from "react";
import { Controller, FieldValues, RegisterOptions } from "react-hook-form";
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
  rules,
}: {
  name: string;
  label: string;
  control: any;
  disabled?: boolean;
  multiline?: boolean;
  className?: string;
  rows?: number;
  type?: "text" | "password";
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}) => {
  return (
    <Controller
      name={name}
      rules={rules}
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
