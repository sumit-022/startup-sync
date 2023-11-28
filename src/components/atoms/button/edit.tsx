import { MdEdit } from "react-icons/md";
import React from "react";
import Modal from "../modal";
import JobOrderForm from "@/pages/dashboard/molecules/joborder-form";

interface EditJobButtonProperties {
  className?: string;
}

const EditJobButton: React.FC<EditJobButtonProperties> = ({ className }) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <button
      className="text-white text-sm p-2 rounded-full bg-primary-bright-blue"
      onClick={() => setShowModal(true)}
    >
      <MdEdit className={className} />
      <Modal active={showModal} setActive={setShowModal} className="w-1/2">
        <JobOrderForm mode="edit" options={["save", "complete", "cancel"]} />
      </Modal>
    </button>
  );
};

export default EditJobButton;
