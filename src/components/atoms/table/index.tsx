import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import FlagJobButton from "../button/flag";
import EditJobButton from "../button/edit";
import CancelJobButton from "../button/delete";
import ViewJobButton from "../button/view";
import formatDate from "@/utils/date-formatter";
import clamp from "@/utils/clamp";

interface TableProperties {
  data: JobType[];
  className?: string;
  headers: {
    name: string;
    show: boolean;
  }[];
  callback: any;
}

const Table: React.FC<TableProperties> = ({
  data,
  className = "",
  headers,
  callback,
}) => {
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
  return (
    <table className={`w-full overflow-x-scroll ${className}`}>
      <thead>
        <tr className="border-b">
          <th className="text-left">
            <Checkbox
              style={{
                color: "#ee6123",
              }}
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </th>
          {headers.map((item, index) => (
            <th className="text-center py-2 w-[200px]" key={index}>
              <span className="flex items-center gap-1 justify-center">
                {item.name}
              </span>
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
            {headers.map((header, index) => {
              switch (header.name) {
                case "Job Code":
                  return (
                    <td className="p-2 w-[200px] text-center">
                      {item.jobCode}
                    </td>
                  );
                case "Job Description":
                  return (
                    <td className="p-2 w-[200px] text-center">
                      {clamp(item?.description, 30)}
                    </td>
                  );
                case "Quoted Date":
                  return (
                    <td className="p-2 w-[200px] text-center">
                      {item.quotedAt}
                    </td>
                  );
                case "Recieve Date":
                  return (
                    <td className="p-2 w-[200px] text-center">
                      {formatDate(item.receivedAt)}
                    </td>
                  );
                case "Ship Name":
                  return (
                    <td className="p-2 w-[200px] text-center">
                      {item?.shipName}
                    </td>
                  );
                case "Company Name":
                  return (
                    <td className="p-2 w-[200px] text-center">
                      {item?.company?.name}
                    </td>
                  );
                case "Service Coordinator":
                  return (
                    <td className="p-2 w-[200px] text-center">
                      {item?.assignedTo?.fullname}
                    </td>
                  );
                case "Status":
                  return (
                    <td className="p-2 w-[200px] text-center">
                      <span className="font-semibold italic text-sm bg-gray-400 p-1 text-white">
                        {item.status}
                      </span>
                    </td>
                  );
                case "Action":
                  return (
                    <td>
                      <div className="flex gap-2 justify-center">
                        <FlagJobButton />
                        <ViewJobButton data={item} />
                        <EditJobButton data={item} callback={callback} />
                        <CancelJobButton data={item} callback={callback} />
                      </div>
                    </td>
                  );
                default:
                  return <td></td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
