import React from "react";
import clsx from "clsx";

interface ButtonProperties {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ icon, children, className, onClick }: ButtonProperties) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-bright-blue",
        className
      )}
      onClick={() => onClick && onClick()}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
