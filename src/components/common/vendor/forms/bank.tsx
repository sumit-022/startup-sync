import FormInputText from "@/components/atoms/input/text";
import { FormControl } from "@mui/material";
import FormHeading from "@/components/atoms/heading/form-heading";
import React from "react";
import InputGroup from "@/components/atoms/input/input-group";

interface BankDetailsProperties {
  control: any;
}

const BankDetails: React.FC<BankDetailsProperties> = ({ control }) => {
  return (
    <FormControl
      fullWidth
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <FormInputText label="Bank Name" name="bankName" control={control} />
      <InputGroup inputs={2}>
        <FormInputText
          label="Bank Country"
          name="bankcountry"
          control={control}
        />
        <FormInputText
          label="Bank Code / Routing Number"
          name="bankCode"
          control={control}
        />
      </InputGroup>
      <FormInputText
        label="Bank Account Name"
        name="accountName"
        control={control}
      />
      <FormInputText label="IFSC Code" name="ifscCode" control={control} />
      <FormInputText label="MICR Code" name="micrCode" control={control} />
      <FormInputText label="GST Number" name="gstNumber" control={control} />
    </FormControl>
  );
};

export default BankDetails;
