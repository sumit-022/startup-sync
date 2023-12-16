import React from "react";
import Modal from "../modal";
import JobOrderForm from "../../common/joborder/joborder-form";
import { FaEye } from "react-icons/fa";

interface ViewJobButtonProperties {
  className?: string;
}

const ViewJobButton: React.FC<ViewJobButtonProperties> = ({ className }) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <button
      className="text-white text-sm p-2 rounded-full bg-yellow-500"
      onClick={() => setShowModal(true)}
    >
      <FaEye className={className} />
      <Modal active={showModal} setActive={setShowModal} className="w-1/2">
        <JobOrderForm mode="create" authData={null} />
      </Modal>
    </button>
  );
};

export default ViewJobButton;
