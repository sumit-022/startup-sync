import React from "react";
import { Controller } from "react-hook-form";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface FormInputRadioGroupProperties {
  labels: string[];
  name: string;
  control: any;
}

const FormInputRadioGroup: React.FC<FormInputRadioGroupProperties> = ({
  labels,
  name,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RadioGroup
          row
          aria-label={name}
          name={name}
          value={value}
          onChange={onChange}
        >
          {labels.map((label) => (
            <FormControlLabel
              key={label}
              value={label}
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default FormInputRadioGroup;
