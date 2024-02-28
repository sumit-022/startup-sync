import { Box, Dialog, Slide, Typography, IconButton } from "@mui/material";
import React from "react";
import { MdAdd } from "react-icons/md";
import { TransitionProps } from "@mui/material/transitions";
import RFQForm from "@/components/common/joborder/form/job-rfq";
import { IoCreate } from "react-icons/io5";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const RFQDialog = ({
  job,
  open,
  setOpen,
  refresh,
}: {
  job: JobType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
}) => {
  return (
    <>
      <Dialog
        open={open}
        fullScreen
        sx={{
          "& .MuiDialog-paper": {
            display: "flex",
            justifyContent: "center",
            p: 4,
          },
        }}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <Box
          sx={{
            backgroundColor: "",
            flexDirection: "column",
            gap: 2,
            zIndex: 10,
          }}
        >
          <div className="absolute top-2 right-1">
            <button className="text-3xl" onClick={() => setOpen(false)}>
              &times;
            </button>
          </div>
          <RFQForm job={job} setModalOpen={setOpen} refresh={refresh} />
        </Box>
      </Dialog>
    </>
  );
};

export default RFQDialog;
