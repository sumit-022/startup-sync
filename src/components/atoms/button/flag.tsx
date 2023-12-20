import {
  Box,
  Button,
  FormControl,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FaFlag } from "react-icons/fa";
import FormInputText from "../input/text";
import { useForm } from "react-hook-form";
import FormInputDate from "../input/date";

const FlagJobButton = () => {
  const [modal, setModal] = useState(false);
  const { control } = useForm();
  return (
    <>
      <IconButton
        className="text-white text-sm p-2 rounded-full bg-pink-600 hover:bg-pink-600"
        onClick={() => setModal(true)}
      >
        <FaFlag />
      </IconButton>
      <Modal open={modal} onClose={() => setModal(false)}>
        <Box
          sx={{
            width: "30%",
            bgcolor: "background.paper",
            borderRadius: "10px",
            p: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
              }}
              variant="subtitle1"
              component="body"
            >
              Flag Job
            </Typography>
            <FormInputDate
              label="Reminder set for"
              control={control}
              name="date"
            />
            <FormInputText
              label="Comment"
              control={control}
              className="w-full"
              multiline
              rows={3}
              name="comment"
            />
            <Button
              variant="contained"
              className="bg-red-600 hover:bg-red-700 w-full flex gap-1"
            >
              <FaFlag />
              Flag
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default FlagJobButton;
