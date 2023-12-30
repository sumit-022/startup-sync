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
  readOnly,
  endAdornment,
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
  readOnly?: boolean;
  endAdornment?: React.ReactNode;
}) => {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          name={name}
          variant="outlined"
          multiline={multiline}
          rows={rows}
          onChange={onChange}
          disabled={disabled}
          InputProps={{
            readOnly: readOnly,
            endAdornment: endAdornment,
          }}
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
