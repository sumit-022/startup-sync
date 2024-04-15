import React, { useContext } from "react";
import { Modal, Box, Autocomplete, TextField, Typography } from "@mui/material";
import AuthContext from "@/context/AuthContext";
import instance from "@/config/axios.config";
import getUnique from "@/utils/unique";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";

interface NotifyModalProps {
  open: boolean;
  onClose: () => void;
  job: JobType | null;
}

const NotifyModal: React.FC<NotifyModalProps> = ({ open, onClose, job }) => {
  const { user } = useContext(AuthContext);
  const getUniqueVendors = (rfqs: any[]) => {
    const uniqueRfqs = getUnique(
      rfqs,
      (rfq) => rfq.vendor.id,
      (rfq) => !rfq.filled
    );
    return Array.from(uniqueRfqs).map((rfq) => {
      return {
        id: rfq.vendor.id,
        name: rfq.vendor.name,
      };
    });
  };
  const vendors = getUniqueVendors(job?.rfqs || []);
  const [selectedVendors, setSelectedVendors] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleNotify = async (vendors: any) => {
    try {
      setLoading(true);
      const bodies = vendors.reduce((acc: any, vendor: any) => {
        const body = `Dear ${vendor.name},<br/><br/>I hope this email finds you well.<br/><br/>We wanted to kindly remind you that we are still awaiting your quotation for our subject enquiry. Your participation in this query is pivotal to us, and we highly value your prompt response.<br/><br/>Please let us know if you require any further information or assistance to proceed with your quotation submission.<br/><br/>Thank you for your attention to this matter, and we look forward to receiving your quotes soon.<br/>Warm regards,<br/><br/><br/><div style="display:flex;gap:20px"><img src="https://jobs.shinpoengineering.com/email.png" alt="Shinpo Engineering Pte Ltd" style="margin-right:10px;width:150px;height:65px"/><div><p style="font-weight: 700;color:#008ac9;font-size:20;margin:0">${user?.fullname}</p>Shinpo Engineering Pte. Ltd.<br/><br/><p style="margin:0;padding:0">${user?.designation}</p><p style="margin:0;padding:0">${user?.phone}</p><p style="margin:0;padding:0;color:#008ac9;">Email: purchase@shinpoengineering.com</p><p style="color:#008ac9;padding:0;margin:0;">1 Tuas South Avenue 6 #05-20
            The Westcom Singapore 637021</p>Tel: +65 65399007<br/>www.shinpoengineering.com
            </div></div>`;
        return {
          ...acc,
          [vendor.id]: {
            body,
            subject: `RE: RFQ-${job?.jobCode} - ${job?.description}`,
          },
        };
      }, {});
      await instance.post("/job/notify-vendors", {
        bodies,
      });
      toast.success("Vendors Notified");
      onClose();
    } catch (error) {
      toast.error("Failed to Notify Vendors");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <div className="flex flex-col gap-6 items-center">
          <Typography variant="h4" align="center">
            Notify Vendors
          </Typography>
          <Autocomplete
            fullWidth
            multiple
            options={vendors}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Select Vendors to Notify" />
            )}
            onChange={(_, value) => setSelectedVendors(value)}
          />
          <LoadingButton
            loading={loading}
            onClick={() => handleNotify(selectedVendors)}
            disabled={loading}
            variant="outlined"
          >
            Notify Selected Vendors
          </LoadingButton>
        </div>
      </Box>
    </Modal>
  );
};

export default NotifyModal;
