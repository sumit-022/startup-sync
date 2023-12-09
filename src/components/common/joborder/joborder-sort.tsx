import React, { useState } from "react";
import FilterForm from "./joborder-filterform";
import ConfigureForm from "./joborder-configure";
import { GrConfigure } from "react-icons/gr";
import { IoFilter } from "react-icons/io5";

interface Props {
  availableHeaders: {
    name: string;
    show: boolean;
  }[];
  setSelectedHeaders: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        show: boolean;
      }[]
    >
  >;
}

const Filters: React.FC<Props> = ({ availableHeaders, setSelectedHeaders }) => {
  const [filters, showFilters] = useState(false);
  const [configure, showConfigure] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <button
          className="flex border gap-1 items-center px-2 py-1 hover:bg-gray-200 rounded-md w-max"
          onClick={() => showFilters(!filters)}
        >
          <IoFilter />
          Filters
        </button>
        <button
          className="flex border gap-1 items-center px-2 py-1 hover:bg-gray-200 rounded-md w-max"
          onClick={() => showConfigure(!configure)}
        >
          <GrConfigure />
          Configure Table
        </button>
      </div>
      {configure && (
        <ConfigureForm
          availableHeaders={availableHeaders}
          setSelectedHeaders={setSelectedHeaders}
        />
      )}
      {filters && <FilterForm />}
    </div>
  );
};

export default Filters;
