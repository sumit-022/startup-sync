import { MdEdit } from "react-icons/md";
import React from "react";
import Modal from "../modal";
import JobOrderForm from "../../common/joborder/joborder-form";

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
      <Modal
        active={showModal}
        setActive={setShowModal}
        className="w-2/3 h-5/6 overflow-scroll"
      >
        <JobOrderForm mode="edit" authData={null} />
      </Modal>
    </button>
  );
};

export default EditJobButton;
