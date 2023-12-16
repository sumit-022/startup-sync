import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FormControl, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CompanyForm from "./form/company";

const AddCompany = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        aria-label="add"
        size="medium"
        className="hover:bg-transparent"
        onClick={() => setOpen(true)}
      >
        <IoIosAddCircleOutline />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <CompanyForm />
      </Modal>
    </>
  );
};

export default AddCompany;
