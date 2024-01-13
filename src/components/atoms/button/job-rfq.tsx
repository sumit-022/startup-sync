import { Box, Dialog, Slide, Typography } from "@mui/material";
import React from "react";
import { MdAdd } from "react-icons/md";
import { TransitionProps } from "@mui/material/transitions";
import RFQForm from "@/components/common/joborder/form/job-rfq";
import { IoCreate } from "react-icons/io5";

interface Props {
  job: JobType;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const GenerateRFQButton: React.FC<Props> = ({ job }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        className="text-white text-sm p-2 rounded-full bg-primary-bright-blue"
        onClick={() => setOpen(true)}
      >
        <MdAdd />
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen
        TransitionComponent={Transition}
      >
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            overflow: "scroll",
            p: 4,
            backgroundColor: "",
          }}
        >
          <div className="flex justify-end">
            <button className="text-2xl" onClick={() => setOpen(false)}>
              &times;
            </button>
          </div>
          <div className="flex w-full gap-2 underline items-center justify-center">
            <IoCreate className="text-3xl" />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Generate RFQ for Job {job.jobCode}
            </Typography>
          </div>
          <RFQForm job={job} />
        </Box>
      </Dialog>
    </>
  );
};

export default GenerateRFQButton;
