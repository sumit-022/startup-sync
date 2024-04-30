import React from "react";
import clsx from "clsx";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

const Card = ({
  icon,
  title,
  description,
  className,
  active,
  onClick,
}: CardProps) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-4 p-4 rounded-lg bg-transparent border border-gray-300/20 hover:border-gray-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg",
        {
          "!bg-[#818cf8]/10 border-[#818cf8] hover:border-[#818cf8] shadow-lg":
            active,
        },
        className
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          "flex items-center justify-center w-14 h-14 text-pallete1-button-background rounded-full bg-gray-300/5",
          {
            "text-pallete1-title": active,
          }
        )}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold text-pallete1-title">{title}</h3>
        <p className="text-gray-400">{description}</p>
        <Link href="/#" className="text-pallete1-link-blue w-max hover:text-blue-600">
          Learn more <FaAngleRight className="inline" />
        </Link>
      </div>
    </div>
  );
};

export default Card;
