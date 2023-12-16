import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete } from "@mui/material";

const FormInputAutoComplete = ({
  name,
  label,
  control,
  options,
}: {
  name: string;
  label: string;
  control: any;
  options: {
    id: number;
    name: string;
  }[];
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option: { id: number; name: string }) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          onChange={(_, data) => onChange(data)}
        />
      )}
    />
  );
};

export default FormInputAutoComplete;
