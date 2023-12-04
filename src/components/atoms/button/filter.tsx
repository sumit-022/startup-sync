import React from "react";
import Dropdown from "../dropdown";
import { FaAngleRight } from "react-icons/fa";

interface FilterButtonProperties {
  icon?: React.ReactNode;
  title: string;
  filterOptions: { name: string; value?: number; children: string[] }[];
}

const FilterButton: React.FC<FilterButtonProperties> = ({
  icon,
  title,
  filterOptions,
}) => {
  return (
    <Dropdown activeCondition={false}>
      {(handleClick, open) => (
        <div className="relative">
          <button
            className="hover:bg-[#f0f2f5] relative w-max flex gap-1 items-center px-2 py-1 rounded-md"
            onClick={handleClick}
          >
            {icon}
            {title}
          </button>
          {open && (
            <div className="absolute bg-white border z-50 top-10 left-1/2 -translate-x-1/2 border-gray-300 rounded-md shadow-lg w-[200px]">
              {filterOptions.map((filter, index) => {
                return (
                  <div key={index} className="hover:bg-[#f0f2f5] px-4 py-2">
                    {filter.children?.length > 0 ? (
                      <Dropdown activeCondition={false}>
                        {(handleClick, open) => (
                          <div className="relative">
                            <div
                              className="flex cursor-pointer relative justify-between items-center gap-2"
                              onClick={handleClick}
                            >
                              {filter.name}
                              <FaAngleRight />
                            </div>
                            {open && (
                              <div className="absolute bg-white border z-50 top-0 left-full border-gray-300 rounded-md shadow-lg w-[200px]">
                                {filter.children.map((child, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="hover:bg-[#f0f2f5] px-4 py-2"
                                    >
                                      <div className="flex gap-1 items-center">
                                        <input type="radio" name="year" />
                                        {child}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </Dropdown>
                    ) : (
                      <div className="flex cursor-pointer justify-center items-center gap-2">
                        {filter.name}
                        {filter.value && <span className="bg-gray-200 rounded-full p-2 text-xs flex items-center justify-center">{filter.value}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </Dropdown>
  );
};

export default FilterButton;
