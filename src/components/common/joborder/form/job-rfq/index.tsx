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
import SpareCard from "@/components/atoms/card/spare-card";
import Button from "@/components/atoms/button";

const RFQForm = ({ job }: { job: JobType }) => {
  const [vendors, setVendors] = React.useState<VendorType[]>([]);
  const [addSpareModal, setAddSpareModal] = React.useState(false);
  const [spare, setSpare] = useState<{
    title: string;
    description: string;
    quantity: number;
    attachment: File | null;
  }>({
    title: "",
    description: "",
    quantity: 0,
    attachment: null,
  });
  const [loading, setLoading] = React.useState(false);

  const { control, handleSubmit, watch } = useForm<RFQFormType>({
    defaultValues: {
      jobId: job.id,
      description: job.description,
      vendors: [],
      shipName: job.shipName,
      spareDetails: [],
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
        {fields.map((field, index) => (
          <div key={index} className="flex gap-2 items-center">
            <SpareCard {...field} />
            <IconButton onClick={() => remove(index)} color="error">
              <MdDelete />
            </IconButton>
          </div>
        ))}
        <Button
          onClick={() => setAddSpareModal(true)}
          className="flex gap-2 items-center w-max ml-auto mr-auto bg-blue-500 hover:bg-blue-700 text-white"
        >
          <MdAdd />
          Add Item
        </Button>
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
        <Modal open={addSpareModal} onClose={() => setAddSpareModal(false)}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              overflow: "scroll",
              height: "80%",
              borderRadius: 2,
              flexDirection: "column",
              gap: 2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "80%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2" align="center">
              Add Spare
            </Typography>
            <TextField
              fullWidth
              label="Item Name"
              variant="outlined"
              value={spare.title}
              onChange={(e) => {
                setSpare({ ...spare, title: e.target.value });
              }}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={spare.description}
              onChange={(e) => {
                setSpare({ ...spare, description: e.target.value });
              }}
            />
            <TextField
              type="number"
              fullWidth
              label="Quantity"
              variant="outlined"
              value={spare.quantity}
              onChange={(e) => {
                setSpare({ ...spare, quantity: parseInt(e.target.value) });
              }}
            />
            <label htmlFor="upload">
              <Box
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                  border: "3px dotted #ccc",
                }}
              >
                <IconButton className="hover:bg-transparent">
                  <IoMdCloudUpload />
                </IconButton>
                <Typography variant="body2" component="p">
                  Upload Attachment
                </Typography>
              </Box>
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const reqFile = e.target.files?.[0];
                if (!reqFile) return;
                if (reqFile.type.indexOf("image") == -1) {
                  toast.error("Only images are allowed");
                  return;
                }

                setSpare({ ...spare, attachment: reqFile });
              }}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white p-[6px] rounded-md"
              onClick={() => {
                append({
                  ...spare,
                });
                setSpare({
                  title: "",
                  description: "",
                  quantity: 0,
                  attachment: null,
                });
                setAddSpareModal(false);
              }}
            >
              Add Spare
            </button>
          </Box>
        </Modal>
      </FormControl>
    </>
  );
};

export default RFQForm;
