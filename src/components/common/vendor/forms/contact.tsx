import FormInputText from "@/components/atoms/input/text";
import FormHeading from "@/components/atoms/heading/form-heading";
import { FormControl } from "@mui/material";
import React from "react";
import InputGroup from "@/components/atoms/input/input-group";

interface ContactDetailsProperties {
  control: any;
}

const ContactDetails: React.FC<ContactDetailsProperties> = ({ control }) => {
  return (
    <FormControl
      fullWidth
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <FormHeading heading="Sales Incharge" />
      <FormInputText
        label="Contact Name Title"
        name="salesname"
        control={control}
      />
      <InputGroup inputs={2}>
        <FormInputText
          label="Mobile Number"
          name="salesmobile"
          control={control}
        />
        <FormInputText
          label="Land Line Number"
          name="saleslandline"
          control={control}
        />
      </InputGroup>
      <FormInputText
        label="Email Address"
        name="salesemail"
        control={control}
      />
      <FormHeading heading="Emergency Contact" />
      <InputGroup inputs={2}>
        <FormInputText
          label="Emergency Contact Person Name"
          name="emergencyname"
          control={control}
        />
        <FormInputText
          label="Emergency Contact Number"
          name="emergencymobile"
          control={control}
        />
        <FormInputText
          label="Emergency Contact Email"
          name="emergencyemail"
          control={control}
        />
        <FormInputText
          label="Emergency Contact Landline"
          name="emergencylandline"
          control={control}
        />
      </InputGroup>
      <FormHeading heading="Receivables" />
      <FormInputText
        label="Contact Name Title"
        name="accountsname"
        control={control}
      />
      <InputGroup inputs={2}>
        <FormInputText
          label="Mobile Number"
          name="accountsmobile"
          control={control}
        />
        <FormInputText
          label="Land Line Number"
          name="accountslandline"
          control={control}
        />
      </InputGroup>
      <FormInputText
        label="Email Address"
        name="accountsemail"
        control={control}
      />
    </FormControl>
  );
};

export default ContactDetails;
