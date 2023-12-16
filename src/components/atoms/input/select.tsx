import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const FormInputSelect = ({
  id,
  name,
  control,
  label,
  className,
  fetchFunction,
}: {
  id: string;
  name: string;
  control: any;
  label: string;
  className?: string;
  fetchFunction: () => Promise<
    {
      id: number;
      name: string;
    }[]
  >;
}) => {
  const [options, setOptions] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  useEffect(() => {
    const fetchOptions = async () => {
      const fetchedOptions = await fetchFunction();
      setOptions(fetchedOptions);
    };
    fetchOptions();
  }, [fetchFunction]);

  const generateSingleOptions = () => {
    return options.map(
      (
        option: {
          id: number;
          name: string;
        },
        index
      ) => {
        return (
          <MenuItem key={index} value={option.id}>
            {option.name}
          </MenuItem>
        );
      }
    );
  };
  return (
    <FormControl className="myclass w-full">
      <InputLabel id={id}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={label}
            value={value}
            onChange={onChange}
            id={id}
            className={className}
          >
            {generateSingleOptions()}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default FormInputSelect;
