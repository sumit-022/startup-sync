import FormInputText from "@/components/atoms/input/text";
import { Checkbox, FormControl, FormGroup } from "@mui/material";
import FormHeading from "@/components/atoms/heading/form-heading";
import React, { useEffect } from "react";
import InputGroup from "@/components/atoms/input/input-group";
import FormInputRadioGroup from "@/components/atoms/input/radio-group";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import FormInputCheckboxGroup from "@/components/atoms/input/checkbox-group";
import FormInputCheckbox from "@/components/atoms/input/checkbox";
import FormInputAutoComplete from "@/components/atoms/input/auto-complete";

interface CommercialDetailsProperties {
  control: any;
}

const CommercialDetails: React.FC<CommercialDetailsProperties> = ({
  control,
}) => {
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    instance
      .get("/services?pagination[page]=1&pagination[pageSize]=1000")
      .then((res) => {
        console.log(res.data.data);

        setCategories(parseAttributes(res.data.data));
      });
  }, []);

  return (
    <FormControl
      fullWidth
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <FormHeading heading="Commercial Details" />
      <InputGroup inputs={3}>
        <FormInputText
          control={control}
          name="payterms"
          label="Payment Terms"
        />
        <FormInputText
          control={control}
          name="paymethod"
          label="Primary Currency"
        />
        <FormInputText
          control={control}
          name="freightterms"
          label="Freight Terms"
        />
      </InputGroup>
      <FormInputRadioGroup
        required
        control={control}
        rules={{ required: "This field is required" }}
        label="Ownership Type"
        name="ownership"
        labels={[
          { value: "PUBLIC", label: "Public" },
          { value: "PRIVATE", label: "Private" },
          { value: "GOVERNMENTOWNED", label: "Government Owned" },
        ]}
      />
      <FormHeading heading="Category" />
      <FormInputAutoComplete
        required
        title="services"
        control={control}
        rules={{ required: "This field is required" }}
        label="Category"
        options={categories}
      />
      <FormHeading heading="Declaration" />
      <FormInputCheckbox
        control={control}
        name="declaration"
        label="I hereby declare that the information provided is true and correct to the best of my knowledge."
        required
      />
    </FormControl>
  );
};

export default CommercialDetails;
