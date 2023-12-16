import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm } from "react-hook-form";
import { TiTick } from "react-icons/ti";
import { MdOutlineDeleteForever } from "react-icons/md";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SelectInput from "@/components/atoms/select";

const FilterForm = () => {
  const [filters, setFilters] = useState<{
    queriedFrom: Date | null;
    queriedUpto: Date | null;
    quotedFrom: Date | null;
    quotedUpto: Date | null;
  }>({
    queriedFrom: null,
    queriedUpto: null,
    quotedFrom: null,
    quotedUpto: null,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-2">
          <DatePicker label="Queried From" className="uppercase" />
          <DatePicker label="Queried Upto" className="uppercase" />
        </div>
        <div className="flex flex-col gap-2">
          <DatePicker label="Quoted From" className="uppercase" />
          <DatePicker label="Quoted Upto" className="uppercase" />
        </div>
        <div className="flex flex-col gap-2">
          <SelectInput
            options={["Spare Supply", "Services"]}
            className="w-[200px]"
            label="Nature of Job"
          />
          <SelectInput
            options={[
              "Engineer 1",
              "Engineer 2",
              "Engineer 3",
              "Sumit Raj",
              "Ranjan Tripathi",
            ]}
            className="w-[200px]"
            label="Service Cordinator"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button className="h-max flex items-center text-green-700 font-semibold rounded-md">
            <TiTick className="text-lg" />
            Apply Filters
          </button>
          <button className="h-max flex items-center text-red-700 font-semibold rounded-md">
            <MdOutlineDeleteForever className="text-lg" />
            Clear Filters
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default FilterForm;
