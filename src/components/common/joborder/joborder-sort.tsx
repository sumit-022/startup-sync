import React, { useState } from "react";
import FilterForm from "./form/filter";
import ConfigureForm from "./joborder-configure";
import { GrConfigure } from "react-icons/gr";
import { IoFilter } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { IoMdPrint } from "react-icons/io";

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
  onDownload?: () => void;
}

const Filters: React.FC<Props> = ({
  availableHeaders,
  setSelectedHeaders,
  onDownload,
}) => {
  const [filters, showFilters] = useState(false);
  const [configure, showConfigure] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
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
        <div className="flex gap-3">
          <button
            className="flex border gap-1 items-center px-2 py-1 hover:bg-gray-200 rounded-md w-max"
            onClick={() => onDownload && onDownload()}
          >
            <IoMdDownload />
          </button>
          <button className="flex border gap-1 items-center px-2 py-1 hover:bg-gray-200 rounded-md w-max">
            <IoMdPrint />
          </button>
        </div>
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
