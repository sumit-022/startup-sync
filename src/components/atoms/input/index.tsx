import React from "react";
import DatePickerTool from "../date";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import clsx from "clsx";

interface InputProperties {
  label?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value?: string;
  className?: string;
  disabled?: boolean;
  wrapperClassName?: string;
}

const Input: React.FC<InputProperties> = ({
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
        <DatePickerTool />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={clsx("border border-black/20 rounded-lg p-2", className)}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
