import FormInputText from "@/components/atoms/input/text";
import { Box, FormControl, Typography, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const CompanyForm = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      companyName: "",
      address: "",
      city: "",
      state: "",
      country: "",
    },
  });
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "35%",
        bgcolor: "background.paper",
        borderRadius: "5px",
        p: 4,
      }}
    >
      <FormControl
        fullWidth
        title="Company Form"
        className="flex flex-col gap-4"
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          className="text-center"
        >
          Add Company
        </Typography>
        <FormInputText
          name="companyName"
          label="Company Name"
          control={control}
        />
        <FormInputText name="address" label="Address" control={control} />
        <FormInputText name="city" label="City" control={control} />
        <FormInputText name="state" label="State" control={control} />
        <FormInputText name="country" label="Country" control={control} />
        <Button
          variant="contained"
          fullWidth
          className="bg-primary-bright-blue"
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default CompanyForm;
