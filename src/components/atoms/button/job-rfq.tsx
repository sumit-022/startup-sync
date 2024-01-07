import { Box, Dialog, Slide, Typography } from "@mui/material";
import React from "react";
import { MdAdd } from "react-icons/md";
import { TransitionProps } from "@mui/material/transitions";
import RFQForm from "@/components/common/joborder/form/job-rfq";

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
        <Box sx={{ height: "100vh", width: "100vw", p: 4 }}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Generate RFQ for Job {job.jobCode}
          </Typography>
          <RFQForm job={job} />
        </Box>
      </Dialog>
    </>
  );
};

export default GenerateRFQButton;
