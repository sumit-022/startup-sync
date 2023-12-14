import React from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import clsx from "clsx";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface InputProperties {
  label?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: any;
  id?: string;
  type?: string;
  value?: string | Date | null;
  className?: string;
  disabled?: boolean;
  wrapperClassName?: string;
}

const Input: React.FC<InputProperties> = ({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
  disabled,
  wrapperClassName,
  className,
}) => {
  return (
    <div className={clsx("flex flex-col gap-1", wrapperClassName)}>
      {label && (
        <label htmlFor="" className="text-left font-semibold uppercase text-xs">
          {label}
        </label>
      )}
      {type === "date" ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(value as Date | null)}
            onChange={onChange}
            format="DD/MM/YYYY"
            disabled={disabled}
          />
        </LocalizationProvider>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={clsx("border border-black/20 rounded-md p-4", className)}
          value={value as string}
          disabled={disabled}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
