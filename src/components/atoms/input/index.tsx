import React from "react";
import DatePickerTool from "../date";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

interface InputProperties {
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

const Input: React.FC<InputProperties> = ({ label, placeholder, type }) => {
  return (
    <div className="flex flex-col gap-1">
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
          className="border border-black/20 rounded-lg p-2"
        />
      )}
    </div>
  );
};

export default Input;
