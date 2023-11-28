import { TiCancel } from "react-icons/ti";
import React from "react";

interface CancelJobButtonProperties {
  className?: string;
}

const CancelJobButton: React.FC<CancelJobButtonProperties> = ({
  className,
}) => {
  return (
    <button className="text-white text-sm p-2 rounded-full bg-red-600">
      <TiCancel />
    </button>
  );
};

export default CancelJobButton;
