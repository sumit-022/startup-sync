import Input from "@/components/atoms/input";
import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchJobOrderProperties {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchJobOrder: React.FC<SearchJobOrderProperties> = ({
  className,
  onChange,
}) => {
  return (
    <div className="flex w-full">
      <Input
        placeholder="Enter Job Code to search.."
        className="rounded-none"
        wrapperClassName="w-full"
        onChange={onChange}
      />
      <button className="bg-yellow-500 text-white p-2 px-4">
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchJobOrder;