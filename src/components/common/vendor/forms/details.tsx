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
        name="name"
        control={control}
      />
      <FormInputText
        label="Tax and Business Registration Number"
        name="regNumber"
        control={control}
      />
      <FormHeading heading="Address" />
      <FormInputText
        label="Address"
        name="address"
        multiline
        rows={3}
        control={control}
      />
      <InputGroup inputs={2}>
        <FormInputText label="City" name="city" control={control} />
        <FormInputText label="Postal Code" name="zip" control={control} />
      </InputGroup>
      <FormInputText label="Country" name="country" control={control} />
    </FormControl>
  );
};

export default VendorDetails;
