import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import EditJobButton from "../button/edit";
import CancelJobButton from "../button/delete";

interface TableProperties {
  data: TableData[];
  className?: string;
}

const Table: React.FC<TableProperties> = ({ data, className = "" }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState(data.map(() => false));

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
    setSelectedItems(data.map(() => !selectAll));
    console.log(selectedItems);
  };

  const handleSelectItem = (index: number) => {
    setSelectedItems((prev) => {
      const newSelectedItems = [...prev];
      newSelectedItems[index] = !prev[index];
      return newSelectedItems;
    });
  };

  const header = [
    <Checkbox
      key={1}
      style={{
        color: "#ee6123",
      }}
      checked={selectAll}
      onChange={handleSelectAll}
    />,
    "Job Code",
    "Job Description",
    "Recieve Date",
    "Quoted Date",
    "Ship Name",
    "Status",
    "Action",
  ];
  return (
    <table className={`w-full my-4 ${className}`}>
      <thead>
        <tr className="border-b">
          {header.map((item, index) => (
            <th className="text-center py-2" key={index}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr className="border-b" key={index}>
            <Checkbox
              checked={selectedItems[index]}
              style={{ color: "#ee6123" }}
              onChange={() => handleSelectItem(index)}
              className="flex"
            />
            <td className="p-2 text-center">{item.jobCode}</td>
            <td className="p-2 text-center">{item.jobDescription}</td>
            <td className="p-2 text-center">
              {typeof item.quotationDate === "string"
                ? item.quotationDate
                : item.quotationDate?.toLocaleDateString()}
            </td>
            <td className="p-2 text-center">
              {typeof item.quotationDate === "string"
                ? item.quotationDate
                : item.quotationDate?.toLocaleDateString()}
            </td>
            <td className="p-2 text-center">{item.shipName}</td>
            <td className="p-2 text-center">
              {item.status === "completed" ? (
                <span className="text-white rounded-md bg-green-600 py-1 px-3">
                  Completed
                </span>
              ) : (
                <span className="bg-yellow-600 py-1 px-3 text-white rounded-md">
                  Pending
                </span>
              )}
            </td>
            <div className="flex gap-2 justify-center">
              <EditJobButton />
              <CancelJobButton />
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
