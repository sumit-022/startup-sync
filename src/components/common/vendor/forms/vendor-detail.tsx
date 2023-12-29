import React, { useEffect } from "react";
import { Button, FormControl } from "@mui/material";
import FormHeading from "@/components/atoms/heading/form-heading";
import FormInputText from "@/components/atoms/input/text";
import InputGroup from "@/components/atoms/input/input-group";
import FormInputRadioGroup from "@/components/atoms/input/radio-group";
import FormInputCheckboxGroup from "@/components/atoms/input/checkbox-group";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import { useForm } from "react-hook-form";

interface VendorDetailFormProperties {
  data: any;
  mode: "view" | "edit";
}

const VendorDetailForm: React.FC<VendorDetailFormProperties> = ({
  mode,
  data,
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: data || {},
  });
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    instance.get("/services").then((res) => {
      setCategories(parseAttributes(res.data.data));
    });
  }, []);

  const onSubmit = (data: any) => {
    if (mode === "edit") {
      instance.put(`/vendors/${data.id}`, data);
    }
  };

  return (
    <FormControl
      fullWidth
      sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormHeading heading="Vendor Details" />
      <FormInputText
        name="name"
        control={control}
        rules={{ required: "This field is required" }}
        label="Legal Name of Vendor"
      />
      <FormInputText
        name="regNumber"
        control={control}
        rules={{ required: "This field is required" }}
        label="Tax and Business Registration Number"
      />
      <FormInputText
        multiline
        rows={3}
        name="address"
        control={control}
        rules={{ required: "This field is required" }}
        label="Address"
      />
      <InputGroup inputs={3}>
        <FormInputText
          name="city"
          control={control}
          rules={{ required: "This field is required" }}
          label="City"
        />
        <FormInputText
          name="zip"
          control={control}
          rules={{ required: "This field is required" }}
          label="Postal Code"
        />
        <FormInputText
          name="country"
          control={control}
          rules={{ required: "This field is required" }}
          label="Country"
        />
      </InputGroup>
      <FormHeading heading="Contact Details" />
      <InputGroup inputs={3}>
        <FormInputText
          name="contactName"
          control={control}
          rules={{ required: "This field is required" }}
          label="Sales Incharge Name"
        />
        <FormInputText
          name="contactNumber"
          control={control}
          rules={{ required: "This field is required" }}
          label="Sales Incharge Number"
        />
        <FormInputText
          name="contactEmail"
          control={control}
          rules={{ required: "This field is required" }}
          label="Sales Incharge Email"
        />
      </InputGroup>
      <InputGroup inputs={3}>
        <FormInputText
          name="contactName"
          control={control}
          rules={{ required: "This field is required" }}
          label="Accounts Incharge Name"
        />
        <FormInputText
          name="contactNumber"
          control={control}
          rules={{ required: "This field is required" }}
          label="Accounts Incharge Number"
        />
        <FormInputText
          name="contactEmail"
          control={control}
          rules={{ required: "This field is required" }}
          label="Accounts Incharge Email"
        />
      </InputGroup>
      <InputGroup inputs={3}>
        <FormInputText
          name="contactName"
          control={control}
          rules={{ required: "This field is required" }}
          label="Emergency Contact Name"
        />
        <FormInputText
          name="contactNumber"
          control={control}
          rules={{ required: "This field is required" }}
          label="Emergency Contact Number"
        />
        <FormInputText
          name="contactEmail"
          control={control}
          rules={{ required: "This field is required" }}
          label="Emergency Contact Email"
        />
      </InputGroup>
      <FormHeading heading="Bank Details" />
      <InputGroup inputs={2}>
        <FormInputText
          name="bankName"
          control={control}
          rules={{ required: "This field is required" }}
          label="Bank Name"
        />
        <FormInputText
          name="bankcountry"
          control={control}
          rules={{ required: "This field is required" }}
          label="Bank Country"
        />
      </InputGroup>
      <FormInputText
        name="bankaccountName"
        control={control}
        rules={{ required: "This field is required" }}
        label="Bank Account Name"
      />
      <InputGroup inputs={4}>
        <FormInputText
          name="bankaccountNumber"
          control={control}
          rules={{ required: "This field is required" }}
          label="Bank Account Number"
        />
        <FormInputText
          name="bankswiftCode"
          control={control}
          rules={{ required: "This field is required" }}
          label="Swift Code / DFI Number"
        />
        <FormInputText
          name="bankcode"
          control={control}
          rules={{ required: "This field is required" }}
          label="Bank Code / Routing Number"
        />
        <FormInputText
          name="bankiban"
          control={control}
          rules={{ required: "This field is required" }}
          label="IBAN Number"
        />
      </InputGroup>
      <FormHeading heading="Commercial Details" />
      <InputGroup inputs={3}>
        <FormInputText
          name="commercialName"
          control={control}
          rules={{ required: "This field is required" }}
          label="Payment Terms"
        />
        <FormInputText
          name="commercialNumber"
          control={control}
          rules={{ required: "This field is required" }}
          label="Primary Currency"
        />
        <FormInputText
          name="commercialEmail"
          control={control}
          rules={{ required: "This field is required" }}
          label="Freight Terms"
        />
      </InputGroup>
      <FormHeading heading="Ownership Type" />
      <FormInputRadioGroup
        labels={["Public", "Private", "Government Owned"]}
        name="ownershipType"
        control={control}
      />
      <FormHeading heading="Category" />
      <FormInputCheckboxGroup
        control={control}
        name="categories"
        labels={categories}
      />
      <Button
        variant="contained"
        type="submit"
        className="bg-primary-bright-blue"
      >
        Submit
      </Button>
    </FormControl>
  );
};

export default VendorDetailForm;
