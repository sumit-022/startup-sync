import React from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { BsCaretDownFill } from "react-icons/bs";
import Checkbox from "../checkbox";

interface TableProperties {
  children?: React.ReactNode;
  className?: string;
  headers: {
    title: string;
    type: "text" | "number" | "date" | "filter" | "checkbox" | any;
    onChange?: Callback<React.ChangeEvent>;
  }[];
  rows: {
    title: string;
    type: "text" | "action" | "checkbox" | any;
    src?: string;
    icon?: React.ReactNode;
    className?: string;
    onClick?: Callback<React.MouseEvent>;
  }[][];
  headerDecoration?: string;
  rowDecoration?: string;
}

const Table: React.FC<TableProperties> = ({
  children,
  className,
  headers,
  rows,
  headerDecoration = "bg-primary-cool-grey",
  rowDecoration = "bg-white",
}) => {
  return (
    <div
      className={
        "no-scroll w-full min-w-full overflow-x-auto sm:px-0 " + className
      }
    >
      <div className="inline-block w-full min-w-full rounded-lg">
        <table className="w-full min-w-full overflow-x-scroll whitespace-nowrap leading-normal ">
          <thead>
            <tr>
              {headers.map((header, index) => {
                return (
                  <Head
                    key={`${header.title}-${header.type}-${index}`}
                    cell={header}
                    decoration={headerDecoration}
                  />
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr
                  key={`${row[index].title}-${index}`}
                  className={rowDecoration}
                >
                  {row.map((cell, index_) => {
                    return (
                      <Row
                        key={`${cell.title}-${cell.type}-${index_}`}
                        cell={cell}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

interface HeaderProperties {
  cell: {
    title: string;
    type: "filter" | "sort" | "text" | "checkbox" | any;
    onChange?: Callback<React.ChangeEvent>;
  };
  decoration?: string;
}

interface RowProperties {
  cell: {
    title: string;
    type: "avatar" | "text" | "action" | "tag" | "checkbox" | any;
    src?: string;
    icon?: React.ReactNode;
    className?: string;
  };
  className?: string;
}

const Head: React.FC<HeaderProperties> = ({ cell, decoration }) => {
  let Element = <></>;
  if (cell.type === "sort") {
    Element = (
      <div className="center gap-1">
        {cell.title}
        <BiSortAlt2 />
      </div>
    );
  }
  if (cell.type === "filter") {
    Element = (
      <div className="center gap-1">
        {cell.title}
        <BsCaretDownFill />
      </div>
    );
  }

  if (cell.type === "checkbox") {
    Element = (
      <div className="center">
        <Checkbox
          className={(active) =>
            `border-white border-2 ${
              active ? "bg-white" : "bg-primary-bright-blue"
            }`
          }
          fill="#ffffff"
        />
      </div>
    );
  }
  if (cell.type === "text") Element = <p className="center">{cell.title}</p>;
  if (cell.type === "date") Element = <p className="center">{cell.title}</p>;
  if (cell.type === "action") Element = <>{cell.title}</>;

  return (
    <th
      className={
        " px-1 py-2 text-center text-xs font-semibold tracking-wider " +
        decoration
      }
    >
      {Element}
    </th>
  );
};

const Row: React.FC<RowProperties> = ({ cell, className }) => {
  let Element = <></>;

  if (cell.type === "checkbox") {
    Element = (
      <div className="center">
        <Checkbox
          className={(active) =>
            `border-primary-bright-blue ${
              active ? "bg-white" : "bg-primary-bright-blue"
            } `
          }
          fill="#ffffff"
        />
      </div>
    );
  }

  if (cell.type === "text") {
    Element = (
      <p
        className={" whitespace-no-wrap center text-gray-900" + cell.className}
      >
        {cell.title}
      </p>
    );
  }

  if (cell.type === "action") {
    Element = (
      <>
        <i className={"whitespace-no-wrap center text-gray-900 " + className}>
          {cell.icon}
        </i>
      </>
    );
  }
  if (cell.type === "date") {
    Element = (
      <p
        className={"whitespace-no-wrap center text-gray-900 " + cell.className}
      >
        {cell.title}
      </p>
    );
  }

  return <td className={"whitespace-nowrap px-1 py-2 text-sm "}>{Element}</td>;
};
