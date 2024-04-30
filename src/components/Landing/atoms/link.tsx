import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { FaAngleRight } from "react-icons/fa6";
import { Url } from "url";

interface RedirectProps {
  to: string | Url;
  children: React.ReactNode;
  className?: string;
}

const Redirect = ({ to, children, className }: RedirectProps) => {
  return (
    <Link
      href={to}
      className={clsx(
        "flex items-center text-sm space-x-2 text-pallete1-link-blue",
        className
      )}
    >
      <span>{children}</span>
      <FaAngleRight />
    </Link>
  );
};

export default Redirect;
