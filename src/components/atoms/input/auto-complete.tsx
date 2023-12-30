import React, { ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete, Checkbox } from "@mui/material";

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
          disableCloseOnSelect
          value={value}
          getOptionLabel={(option: { id: any; title: string }) => option.title}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                checked={selected}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  onChange(
                    e.target.checked
                      ? [...value, option.id]
                      : value.filter((id: string) => id !== option.id)
                  );
                }}
              />
              {option.title}
            </li>
          )}
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
