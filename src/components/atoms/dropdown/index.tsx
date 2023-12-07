import React, { useState, useEffect, useRef } from "react";

type DropdownProperties = {
  children: (handleClick: () => void, open: boolean) => React.ReactNode;
  activeCondition: boolean;
  table: boolean;
};

const Dropdown = ({ children, activeCondition, table }: DropdownProperties) => {
  const [open, setOpen] = useState(activeCondition);
  const dropdownRef = useRef(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      // @ts-ignore
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [open]);

  return !table ? (
    <li className="list-none" ref={dropdownRef}>
      {children(handleClick, open)}
    </li>
  ) : (
    <th className="text-center py-2" ref={dropdownRef}>
      {children(handleClick, open)}
    </th>
  );
};

export default Dropdown;
