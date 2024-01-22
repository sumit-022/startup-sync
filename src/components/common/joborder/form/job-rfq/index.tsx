import FormInputAutoComplete from "@/components/atoms/input/auto-complete";
import {
  Box,
  FormControl,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { IoMdCloudUpload } from "react-icons/io";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm, useFieldArray } from "react-hook-form";
import React, { ChangeEvent, useEffect, useState } from "react";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import FormInputText from "@/components/atoms/input/text";
import FormHeading from "@/components/atoms/heading/form-heading";
import { MdDelete, MdAdd } from "react-icons/md";
import logo from "@/assets/image/logo.jpg";
import Image from "next/image";
import createRfqPdf from "@/utils/create-rfq-pdf";
import qs from "qs";
import { toast } from "react-toastify";
import InputGroup from "@/components/atoms/input/input-group";

const RFQForm = ({ job }: { job: JobType }) => {
  const [vendors, setVendors] = React.useState<VendorType[]>([]);
  const [loading, setLoading] = React.useState(false);

  const { control, handleSubmit, watch } = useForm<RFQFormType>({
    defaultValues: {
      jobId: job.id,
      description: job.description,
      vendors: [],
      shipName: job.shipName,
      spareDetails: [{ title: "", quantity: null, description: "" }],
    },
  });

  const apiRoute = qs.stringify({
    filters: {
      services: {
        id: {
          $containsi: job.services.map((service) => service.id),
        },
      },
    },
  });

  useEffect(() => {
    instance
      .get(`/vendors?${apiRoute}&pagination[page]=1&pagination[pageSize]=1000`)
      .then((res) => {
        setVendors(parseAttributes(res.data.data));
      });
  }, []);

  const { fields, append, remove } = useFieldArray({
    name: "spareDetails",
    control,
  });

  console.log(fields);

  const onSubmit = (data: any) => {
    setLoading(true);
    const pdf = createRfqPdf(data);
    const form = new FormData();
    form.append("jobId", data.jobId);
    form.append("description", data.description);
    form.append("shipName", data.shipName);
    form.append("vendors", JSON.stringify(data.vendors));
    form.append("spareDetails", JSON.stringify(data.spareDetails));
    if (pdf) form.append("attachment", pdf, "rfq.pdf");

    instance
      .post("/job/send-rfq", form)
      .then((res) => {
        toast.success("RFQ Sent");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <FormControl
        fullWidth
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <div className="flex justify-between items-center border-b-2 pb-2">
          <Image src={logo} alt="logo" width={100} height={100} />
          <Typography variant="h5" sx={{ color: "#1bb1d8" }}>
            Vendor Requisition Form
            <small className="block text-sm">
              Shinpo Engineering PTE. LTD.
            </small>
            <small className="block text-sm">
              1 Tuas South Avenue 6 , #05-20 ,S-637021
            </small>
          </Typography>
        </div>
        <FormInputAutoComplete
          control={control}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          title="vendors"
          label="Vendors"
          options={vendors.map((vendor) => ({
            id: vendor.id,
            title: vendor.name,
          }))}
        />
        <FormInputText
          control={control}
          name="description"
          label="Description"
        />
        <FormInputText
          control={control}
          name="shipName"
          disabled
          label="Ship Name"
        />
        <FormHeading heading="Item Details" />
        {fields.map((item, index) => (
          <>
            <FormHeading heading={`Spare ${index + 1}`} />
            <div className="grid grid-cols-[1fr,auto,auto]">
              <InputGroup inputs={3} key={item.id}>
                <FormInputText
                  control={control}
                  name={`spareDetails.${index}.name`}
                  label="Name"
                />
                <FormInputText
                  control={control}
                  type="number"
                  name={`spareDetails.${index}.quantity`}
                  label="Quantity"
                />
                <FormInputText
                  control={control}
                  name={`spareDetails.${index}.description`}
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
                  append({ title: "", quantity: null, description: "" })
                }
                color="primary"
              >
                <MdAdd />
              </IconButton>
            </div>
          </>
        ))}
        <LoadingButton
          variant="contained"
          disabled={fields.length == 0}
          sx={{ mt: 2 }}
          onClick={handleSubmit(onSubmit)}
          loading={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white"
        >
          Send RFQ to Vendors
        </LoadingButton>
      </FormControl>
    </>
  );
};

export default RFQForm;
