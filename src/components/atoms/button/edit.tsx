import { MdEdit } from "react-icons/md";
import React from "react";
import { Box, Modal } from "@mui/material";
import JobOrderForm from "../../common/joborder/joborder-form";
import instance from "@/config/axios.config";

interface EditJobButtonProperties {
  className?: string;
  job: JobType;
  callback: any;
}

const EditJobButton: React.FC<EditJobButtonProperties> = ({
  className,
  job,
  callback,
}) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <button
        className="text-white text-sm p-2 rounded-full bg-primary-bright-blue"
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        <MdEdit className={className} />
      </button>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            height: "80vh",
            overflowY: "scroll",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            width: "80%",
            borderRadius: "10px",
            p: 4,
          }}
        >
          <JobOrderForm
            mode="edit"
            authData={null}
            data={job}
            callback={callback}
            setShowModal={setShowModal}
          />
        </Box>
      </Modal>
    </>
  );
};

export default EditJobButton;
