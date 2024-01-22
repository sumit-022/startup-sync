import React from "react";
import { FaBoxOpen } from "react-icons/fa";

const SpareCard: React.FC<SpareType> = (props) => {
  return (
    <div className="rounded-md w-full shadow-md p-4 bg-[#e66c21] flex items-center justify-between">
      <div className="flex items-center">
        <FaBoxOpen className="text-4xl text-white" />
        <div className="ml-4">
          <h3 className="text-white text-xl">{props.title}</h3>
          <p className="text-white text-sm">{props.description}</p>
        </div>
      </div>
      <div className="flex items-center flex-col">
        <p className="text-white">{props.quantity} Unit</p>
      </div>
    </div>
  );
};

export default SpareCard;
