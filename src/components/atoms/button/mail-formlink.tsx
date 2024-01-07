import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/button";
import { Modal, Box, FormControl } from "@mui/material";
import FormInputText from "../input/text";
import { useForm } from "react-hook-form";
import { IoMdMail } from "react-icons/io";
import { sendMail } from "@/utils/mail";
import instance from "@/config/axios.config";

const MailFormLink = () => {
  const { control, handleSubmit, trigger } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const onSubmit = async (data: any) => {
    const response = await instance.post("/vendors/form/generate-vendor-id");
    sendMail({
      recipient: data.email,
      subject: "Vendor Registration Link",
      content: `Dear Sir/Mam,\n I hope this email finds you well. \n\n To streamline our supplier selection process and maintain up-to-date records, we have recently implemented a Supplier Registration Portal on our website. We kindly invite you to register your company's details on our portal using the following link.\nClick this link to register as a vendor: ${
        process.env.NEXT_PUBLIC_BASE_FRONTEND_URL || window.location.origin
      }/vendor/form/${
        response.data
      } \n\n Please ensure to complete all the required fields accurately, as this will enable us to review and evaluate your company as a potential partner for future collaboration. \n\nPlease note that registering on our Supplier Registration Portal will ensure that your company is included in our database for consideration as relevant projects or partnership opportunities arise.\n\nWe believe that establishing a strong network of trusted suppliers is essential for our mutual growth and success. We highly value the professional relationships we build and look forward to the possibility of collaborating with your esteemed company.\n\nIf you have any questions or encounter any issues during the registration process, please feel free to contact us.`,
    });
  };

  return (
    <>
      <Button
        className="!text-black rounded-none bg-transparent hover:bg-gray-100"
        onClick={() => setModalOpen(true)}
      >
        Send Invitation Link to Vendor
      </Button>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          component={"form"}
        >
          <FormControl
            fullWidth
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormInputText
              name="email"
              label="Email"
              control={control}
              endAdornment={<IoMdMail />}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email must be valid",
                },
              }}
            />
            <Button
              className="bg-yellow-500 text-white"
              onClick={() =>
                trigger().then((noErrors) => {
                  if (!noErrors) return;
                  handleSubmit(onSubmit)();
                })
              }
            >
              Send Invitation Link
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default MailFormLink;
