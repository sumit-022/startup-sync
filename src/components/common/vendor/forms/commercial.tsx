import FormInputText from "@/components/atoms/input/text";
import { Checkbox, FormControl, FormGroup } from "@mui/material";
import FormHeading from "@/components/atoms/heading/form-heading";
import React from "react";
import InputGroup from "@/components/atoms/input/input-group";
import FormInputRadioGroup from "@/components/atoms/input/radio-group";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import FormInputCheckboxGroup from "@/components/atoms/input/checkbox-group";
import FormInputCheckbox from "@/components/atoms/input/checkbox";

interface CommercialDetailsProperties {
  control: any;
}

const CommercialDetails: React.FC<CommercialDetailsProperties> = ({
  control,
}) => {
  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    instance.get("/services").then((response) => {
      setServices(parseAttributes(response.data.data));
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
      <FormHeading heading="Ownership Type" />
      <FormInputRadioGroup
        control={control}
        name="ownership"
        labels={["Public", "Private", "Government Owned"]}
      />
      <FormHeading heading="Category" />
      {services.length > 0 && (
        <FormInputCheckboxGroup
          control={control}
          name="services"
          labels={services.map((service: any) => service.title)}
        />
      )}
      <FormHeading heading="Declaration" />
      <FormInputCheckbox
        control={control}
        name="declaration"
        label="I hereby declare that the information provided is true and correct to the best of my knowledge."
      />
    </FormControl>
  );
};

export default CommercialDetails;
