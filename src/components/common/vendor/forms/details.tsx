import FormInputText from "@/components/atoms/input/text";
import { FormControl } from "@mui/material";
import FormHeading from "@/components/atoms/heading/form-heading";
import React from "react";
import InputGroup from "@/components/atoms/input/input-group";

interface VendorDetailsProperties {
  control: any;
}

const VendorDetails: React.FC<VendorDetailsProperties> = ({ control }) => {
  return (
    <FormControl
      fullWidth
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <FormInputText
        label="Legal Name of Vendor"
        required={{ value: true, message: "This field is required" }}
        name="name"
        control={control}
        rules={{ required: "This field is required" }}
      />
      <FormInputText
        label="Tax and Business Registration Number"
        name="regNumber"
        required={{ value: true, message: "This field is required" }}
        pattern={{
          value: /^[0-9]+$/,
          message: "Only numbers are allowed",
        }}
        control={control}
        rules={{ required: "This field is required" }}
      />
      <FormHeading heading="Address" />
      <FormInputText
        label="Address"
        name="address"
        multiline
        rows={3}
        control={control}
        rules={{ required: "This field is required" }}
      />
      <InputGroup inputs={2}>
        <FormInputText
          label="City"
          name="city"
          control={control}
          rules={{ required: "This field is required" }}
        />
        <FormInputText
          label="Postal Code"
          name="zip"
          control={control}
          rules={{ required: "This field is required" }}
        />
      </InputGroup>
      <FormInputText
        label="Country"
        name="country"
        control={control}
        rules={{ required: "This field is required" }}
      />
    </FormControl>
  );
};

export default VendorDetails;
