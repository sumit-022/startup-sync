import { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function DatePickerTool() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <DatePicker
        onChange={onChange}
        value={value}
        format="d-M-y"
        className="calendar w-full"
      />
    </div>
  );
}

export default DatePickerTool;
