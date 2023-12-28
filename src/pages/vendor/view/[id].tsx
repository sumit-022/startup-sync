import React from "react";
import DashboardLayout from "@/components/layout";
import { FormControl } from "@mui/material";
import FormInputText from "@/components/atoms/input/text";
import { useForm } from "react-hook-form";
import FormHeading from "@/components/atoms/heading/form-heading";

const VendorDetailsPage = (data: any) => {
  const { handleSubmit, control } = useForm({
    defaultValues: data,
  });
  return (
    <DashboardLayout header sidebar>
      <h1 className="text-center font-bold text-2xl bg-primary-bright-blue rounded-full text-white">
        VENDOR DETAILS
      </h1>
      <FormControl
        fullWidth
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormHeading heading="Vendor Details" />
        <FormInputText label="Vendor Name" name="name" control={control} />
        <FormInputText label="Email" name="email" control={control} />
      </FormControl>
    </DashboardLayout>
  );
};

export default VendorDetailsPage;
