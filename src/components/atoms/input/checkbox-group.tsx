import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormInputCheckboxGroupProperties {
  control: any;
  name: string;
  labels: string[];
}

const FormInputCheckboxGroup: React.FC<FormInputCheckboxGroupProperties> = ({
  control,
  name,
  labels,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormGroup>
          {labels.map((label, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={value.includes(label)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...value, label]);
                    } else {
                      onChange(value.filter((item: any) => item !== label));
                    }
                  }}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      )}
    />
  );
};

export default FormInputCheckboxGroup;
