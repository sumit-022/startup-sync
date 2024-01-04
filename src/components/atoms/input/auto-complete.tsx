import React, { ChangeEvent } from "react";
import { Controller, RegisterOptions, FieldValues } from "react-hook-form";
import { TextField, Autocomplete, Checkbox } from "@mui/material";

const FormInputAutoComplete = ({
  title,
  label,
  control,
  options,
  rules,
  required,
  isOptionEqualToValue,
}: {
  title: string;
  label: string;
  control: any;
  options: {
    id: any;
    title: string;
  }[];
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  required?: boolean;
  isOptionEqualToValue?: (
    option: {
      id: any;
      title: string;
    },
    value: {
      id: any;
      title: string;
    }
  ) => boolean;
}) => {
  return (
    <Controller
      name={title}
      rules={rules}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          options={options}
          disableCloseOnSelect
          defaultValue={value}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={(option: { id: any; title: string }) => option.title}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox checked={selected} />
              {option.title}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              error={!!error}
              required={required}
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
