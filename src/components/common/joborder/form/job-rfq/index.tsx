import FormInputAutoComplete from "@/components/atoms/input/auto-complete";
import { Button, FormControl, IconButton, Typography } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import React, { useEffect } from "react";
import instance from "@/config/axios.config";
import qs from "qs";
import parseAttributes from "@/utils/parse-data";
import InputGroup from "@/components/atoms/input/input-group";
import FormInputText from "@/components/atoms/input/text";
import FormHeading from "@/components/atoms/heading/form-heading";
import { MdDelete, MdAdd } from "react-icons/md";
import FormInputSelect from "@/components/atoms/input/select";

const RFQForm = () => {
  const [vendors, setVendors] = React.useState<VendorType[]>([]);

  type RFQFormType = {
    vendors: VendorFormType[];
    rfqnumber: string;
    shipName: string;
    spares: SpareType[];
  };

  type SpareType = {
    name: string;
    description: string;
    quantity: number | null;
  };

  const { control, handleSubmit, watch } = useForm<RFQFormType>({
    defaultValues: {
      vendors: [],
      rfqnumber: "",
      shipName: "",
      spares: [{ name: "", description: "", quantity: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "spares",
    control,
  });
  const onSubmit = (data: any) => console.log(data);

  // const apiRoute = qs.stringify({
  //   filters: {
  //     services: {
  //       id: {
  //         $containsi: job.services.map((service) => service.id),
  //       },
  //     },
  //   },
  // });

  useEffect(() => {
    instance.get(`/vendors`).then((res) => {
      setVendors(parseAttributes(res.data.data));
    });
  }, []);

  return (
    <FormControl
      fullWidth
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <FormInputSelect
        id="jobCode"
        options={[
          {
            id: "1",
            name: "1",
          },
          {
            id: "2",
            name: "2",
          },
        ]}
        control={control}
        name="joCode"
        label="Select Job Order Code"
      />

      <FormInputAutoComplete
        control={control}
        disabled={vendors.length === 0}
        title="vendors"
        label="Vendors"
        options={vendors.map((vendor) => ({
          id: vendor.id,
          title: vendor.name,
        }))}
      />
      <InputGroup inputs={2}>
        <FormInputText
          control={control}
          name="rfqnumber"
          disabled
          label="RFQ Number"
        />
        <FormInputText
          control={control}
          name="shipName"
          disabled
          label="Ship Name"
        />
      </InputGroup>
      <Typography
        variant="h6"
        sx={{ mt: 2, textTransform: "uppercase", fontWeight: 700 }}
      >
        Spares List
      </Typography>
      {fields.map((item, index) => (
        <>
          <FormHeading heading={`Spare ${index + 1}`} />
          <div className="grid grid-cols-[1fr,auto,auto]">
            <InputGroup inputs={3} key={item.id}>
              <FormInputText
                control={control}
                name={`spares.${index}.name`}
                label="Name"
              />
              <FormInputText
                control={control}
                type="number"
                name={`spares.${index}.quantity`}
                label="Quantity"
              />
              <FormInputText
                control={control}
                name={`spares.${index}.description`}
                label="Description"
              />
            </InputGroup>
            <IconButton
              disableRipple
              onClick={() => remove(index)}
              color="error"
              disabled={fields.length === 1}
            >
              <MdDelete />
            </IconButton>
            <IconButton
              disableRipple
              onClick={() =>
                append({ name: "", quantity: null, description: "" })
              }
              color="primary"
            >
              <MdAdd />
            </IconButton>
          </div>
        </>
      ))}
      <Button
        variant="contained"
        className="mt-2 bg-blue-500 hover:bg-blue-600"
        onClick={handleSubmit(onSubmit)}
        disabled={watch("spares").length === 0}
      >
        Send RFQ to Vendors
      </Button>
    </FormControl>
  );
};

export default RFQForm;
