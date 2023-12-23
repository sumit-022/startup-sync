import React from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FormInputDate = ({
  name,
  label,
  control,
}: {
  name: string;
  label: string;
  control: any;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            value={value}
            format="DD/MM/YYYY"
            {...(value && { value: dayjs(value as Date) })}
            onChange={(value: any) => {
              var os = value.$d.getTimezoneOffset() * 60 * 1000;
              var date = new Date(value.$d.getTime() - os);
              onChange(date);
            }}
            slotProps={{
              textField: {
                helperText: error ? error.message : null,
                error: !!error,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default FormInputDate;
