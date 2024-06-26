import React, { useState, useContext } from "react";
import Button from "@/components/atoms/button";
import { Modal, Box, FormControl } from "@mui/material";
import FormInputText from "../input/text";
import { useForm } from "react-hook-form";
import { IoMdMail } from "react-icons/io";
import instance from "@/config/axios.config";
import { toast } from "react-toastify";
import AuthContext from "@/context/AuthContext";

const MailFormLink = () => {
  const { user } = useContext(AuthContext);
  const { control, handleSubmit, trigger } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const onSubmit = async (data: any) => {
    instance
      .post("/vendors/form/generate-vendor-id", {
        email: data.email,
      })
      .then((res) => {
        toast.success("Invitation link sent");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setModalOpen(false);
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
