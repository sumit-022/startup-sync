import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import JobOrderForm from "../../common/joborder/joborder-form";
import { FaEye } from "react-icons/fa";
import JobOrderView from "@/components/common/joborder/joborder-view";

interface ViewJobButtonProperties {
  className?: string;
  data?: Jobtype;
}

const ViewJobButton: React.FC<ViewJobButtonProperties> = ({
  className,
  data,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="text-white text-sm p-2 rounded-full bg-yellow-500"
        onClick={() => setShowModal(true)}
      >
        <FaEye className={className} />
      </button>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            height: "80%",
            width: "40%",
            borderRadius: "5px",
            bgcolor: "background.paper",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 2,
            overflowY: "scroll",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontSize: "1rem",
              textDecoration: "underline",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Job Order Details
          </Typography>
          <JobOrderView data={data} />
          <Button
            variant="contained"
            color="error"
            className="bg-red-500 text-white"
            onClick={() => setShowModal(false)}
            sx={{ marginTop: "1rem" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ViewJobButton;
