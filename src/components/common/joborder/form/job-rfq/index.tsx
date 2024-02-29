import FormInputAutoComplete from "@/components/atoms/input/auto-complete";
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { IoMdCloudUpload } from "react-icons/io";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm, useFieldArray } from "react-hook-form";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import FormInputText from "@/components/atoms/input/text";
import FormHeading from "@/components/atoms/heading/form-heading";
import { MdDelete, MdAdd, MdEdit } from "react-icons/md";
import logo from "@/assets/image/logo.jpg";
import Image from "next/image";
import createRfqPdf from "@/utils/create-rfq-pdf";
import qs from "qs";
import { toast } from "react-toastify";
import SpareCard from "@/components/atoms/card/spare-card";
import MultiFileInput from "@/components/atoms/input/multiple-file";
import AuthContext from "@/context/AuthContext";

const RFQForm = ({
  job,
  setModalOpen,
  refresh,
}: {
  job: JobType;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
}) => {
  const [vendors, setVendors] = React.useState<VendorType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [spareDetails, setSpareDetails] = React.useState<SpareType>({
    title: "",
    description: "",
    quantity: "",
    attachments: null,
  });
  const editing = useRef<number | null>(null);

  const { user } = useContext(AuthContext);

  const { control, handleSubmit, watch } = useForm<RFQFormType>({
    defaultValues: {
      jobId: job.id as string,
      description: job.description,
      vendors: [],
      shipName: job.shipName,
      spareDetails: [],
    },
  });

  const vendorsWatch = watch("vendors");

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

  const { fields, append, remove, update } = useFieldArray({
    name: "spareDetails",
    control,
  });

  const onSubmit = async (data: RFQFormType) => {
    setLoading(true);
    console.log({ data });
    for (let i = 0; i < data.vendors.length; i++) {
      const vendor = vendors.find((vendor) => vendor.id == data.vendors[i].id);
      if (!vendor) continue;
      const blob = await createRfqPdf({
        ...data,
        vendor,
        jobCode: job.jobCode,
        description: job.description || "N/A",
        portOfDelivery: job.targetPort,
        shipName: job.shipName,
        spareDetails: data.spareDetails,
      });
      data.vendors[i].attachment = blob;
    }

    const form = new FormData();
    const mailFooter = `<br/><br/><div style="display:flex;gap:20px"><img src="https://jobs.shinpoengineering.com/email.png" alt="Shinpo Engineering Pte Ltd" style="margin-right:10px;width:150px;height:65px"/><div><p style="font-weight: 700;color:#008ac9;font-size:20;margin:0">${user?.fullname}</p>Shinpo Engineering Pte. Ltd.<br/><br/><p style="margin:0;padding:0">${user?.designation}</p><p style="margin:0;padding:0">${user?.phone}</p><p style="margin:0;padding:0;color:#008ac9;">Email: purchase@shinpoengineering.com</p><p style="color:#008ac9;padding:0;margin:0;">1 Tuas South Avenue 6 #05-20 
    The Westcom Singapore 637021</p>Tel: +65 65399007<br/>www.shinpoengineering.com
    </div></div>`;
    form.append("jobId", data.jobId);
    form.append("description", data.description);
    form.append("shipName", data.shipName);
    form.append("mailFooter", mailFooter);
    form.append(
      "vendors",
      JSON.stringify(
        data.vendors.map(({ attachment, ...vendor }) => ({
          ...vendor,
          ...(attachment ? { attachment: `${vendor.id}.pdf` } : {}),
        }))
      )
    );
    data.vendors.forEach(({ attachment, id }) => {
      if (attachment) {
        form.append("vendorAttachments", attachment, `${id}.pdf`);
      }
    });
    form.append(
      "spareDetails",
      JSON.stringify(
        data.spareDetails.map(({ attachments, ...spare }) => ({
          attachments: attachments
            ? Array.from(attachments).map((attachment) => attachment.name)
            : undefined,
          ...spare,
        }))
      )
    );
    data.spareDetails.forEach(({ attachments }) => {
      if (attachments) {
        Array.from(attachments).forEach((attachment) => {
          form.append("spareAttachments", attachment, attachment.name);
        });
      }
    });

    try {
      const res = await instance.post("/job/send-rfq", form);
      toast.success("RFQ Sent");
      setModalOpen(false);
      refresh();
    } catch (err) {
      toast.error("Failed to send RFQ");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files.length > 2) {
      toast.error("Cannot upload more than 2 files");
      return;
    }
    setSpareDetails((prev) => ({
      ...prev,
      attachments: e.target.files,
    }));
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
              1 Tuas South Avenue 6, #05-20, S-637021
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
        {fields.length == 0 ? (
          <Button onClick={() => setOpen(true)}>
            <IoMdCloudUpload />
            Add Item
          </Button>
        ) : (
          fields.map((field, index) => (
            <SpareCard
              key={index}
              description={field.description}
              quantity={field.quantity}
              title={field.title}
              onSpareDelete={() => remove(index)}
              onSpareAdd={() => {
                setOpen(true);
              }}
              onSpareEdit={() => {
                editing.current = index;
                setSpareDetails({
                  title: field.title,
                  description: field.description,
                  quantity: field.quantity,
                  attachments: field.attachments,
                });
                setOpen(true);
              }}
            />
          ))
        )}
        <LoadingButton
          variant="contained"
          loading={loading}
          disabled={fields.length == 0 || vendorsWatch.length == 0}
          sx={{ mt: 2 }}
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-500 hover:bg-blue-700 text-white"
        >
          Send RFQ to Vendors
        </LoadingButton>
      </FormControl>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setSpareDetails({
            title: "",
            description: "",
            quantity: "",
            attachments: null,
          });
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" align="center">
            Add Spare
          </Typography>
          <TextField
            name="spareDetails.title"
            label="Title"
            value={spareDetails.title}
            onChange={(e) => {
              setSpareDetails((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
          <TextField
            name="spareDetails.description"
            value={spareDetails.description}
            label="Description"
            onChange={(e) => {
              setSpareDetails((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
          <TextField
            type="number"
            name="spareDetails.quantity"
            value={spareDetails.quantity}
            label="Quantity"
            onChange={(e) => {
              setSpareDetails((prev) => ({
                ...prev,
                quantity: e.target.value,
              }));
            }}
          />
          <MultiFileInput
            label="Attachment"
            loading={loading}
            onChange={handleChange}
            files={spareDetails.attachments}
            handleFilesDelete={() => {
              setSpareDetails((prev) => ({
                ...prev,
                attachments: null,
              }));
            }}
          />
          {editing.current === null ? (
            <Button
              onClick={() => {
                setOpen(false);
                append(spareDetails);
                setSpareDetails({
                  title: "",
                  description: "",
                  quantity: "",
                  attachments: null,
                });
              }}
            >
              <MdAdd />
              Add
            </Button>
          ) : (
            <Button
              onClick={() => {
                setOpen(false);
                if (editing.current === null) return;
                update(editing.current, spareDetails);
                setSpareDetails({
                  title: "",
                  description: "",
                  quantity: "",
                  attachments: null,
                });
                editing.current = null;
              }}
            >
              <MdEdit />
              Update
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default RFQForm;
