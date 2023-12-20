import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete } from "@mui/material";

const FormInputAutoComplete = ({
  title,
  label,
  control,
  options,
}: {
  title: string;
  label: string;
  control: any;
  options: {
    id: any;
    title: string;
  }[];
}) => {
  return (
    <Controller
      name={title}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          options={options}
          value={value}
          getOptionLabel={(option: { id: any; title: string }) => option.title}
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
