import React from "react";
import clsx from "clsx";

const variants = {
  pill: "rounded-full border-[1.5px] bg-pallete1-button-background border-pallete1-button-border text-sm text-pallete1-button-text font-semibold",
  outline:
    "border border-pallete1-button-background text-pallete1-button-background font-semibold rounded-full bg-transparent hover:bg-pallete1-button-background hover:text-white",
  link: "underline text-pallete1-button-background",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  textClassName?: string;
  className?: string;
}

const Button = ({
  title,
  variant = "pill",
  textClassName,
  className,
  children,
  style,
  type,
  onClick,
  ...properties
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={clsx(
        "!bg-blue-700 text-white rounded-md hover:bg-blue-600 px-4 py-2 transition-all duration-300 ease-in-out",
        variants[variant],
        textClassName,
        className
      )}
      {...properties}
    >
      {children && children}
      {title && <p className={` ${textClassName}`}>{title}</p>}
    </button>
  );
};

export default Button;
