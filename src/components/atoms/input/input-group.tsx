import React from "react";
import clsx from "clsx";

interface InputGroupProperties {
  children: React.ReactNode;
  className?: string;
  inputs?: number;
}

const InputGroup: React.FC<InputGroupProperties> = ({
  children,
  className,
  inputs,
}) => {
  return (
    <div className={clsx(`grid gap-4 grid-cols-${inputs}`, className)}>
      {children}
    </div>
  );
};

export default InputGroup;
