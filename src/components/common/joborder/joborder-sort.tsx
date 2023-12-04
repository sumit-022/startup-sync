import React, { useState } from "react";
import FilterForm from "./joborder-filterform";
import { IoFilter } from "react-icons/io5";

const Filters = () => {
  const [filters, showFilters] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <button
        className="flex gap-1 items-center px-2 py-1 hover:bg-gray-200 rounded-md w-max"
        onClick={() => showFilters(!filters)}
      >
        <IoFilter />
        Filters
      </button>
      {filters && <FilterForm />}
    </div>
  );
};

export default Filters;
