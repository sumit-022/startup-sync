import React, { useEffect } from "react";
import instance from "@/config/axios.config";
import { decrypt } from "@/utils/crypt";
import { GetServerSideProps } from "next";
import Header from "@/components/layout/header/rfq";
import parseAttributes from "@/utils/parse-data";
import {
  Button,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form, useForm } from "react-hook-form";
import Head from "next/head";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import createAckPDF from "@/utils/create-rfq-ack";

type PageProps = {
  rfqs: any[];
  job: JobType;
};

type RFQReplyFormType = {
  rfqs: {
    id: number;
    unitPrice: number;
    quantity: {
      value: number;
      unit?: string;
    };
    spare: {
      id: number;
      title: string;
      description: string;
      attachments: any[];
      quantity: number;
    };
    total: number;
    vendor: VendorType;
  }[];
  common: {
    selected: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: any;
    discount: number;
    delivery: number;
    amount: number;
    deliveryTime: any;
    connectTime: any;
    connectPort: any;
    remark: any;
  };
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const downloadAttachments = (spare: any) => {
  const link = document.createElement("a");
  link.href = `${baseUrl}/spare/${spare.id}/attachments`;
  link.setAttribute("download", "attachments.zip");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export default function RfqHash(props: PageProps) {
  console.log(props.rfqs);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RFQReplyFormType>({
    defaultValues: {
      rfqs: props.rfqs.map((rfq) => ({
        spare: {
          id: rfq.spare.id,
          title: rfq.spare.title,
          description: rfq.spare.description,
          attachments: rfq.spare.attachments,
          quantity: rfq.spare.quantity,
        },
        vendor: rfq.vendor,
      })),
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);
  const [referenceNumber, setReferenceNumber] = React.useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const unitPrices = watch("rfqs", []).map((rfq) => rfq.unitPrice);
  const quantities = watch("rfqs", []).map((rfq) => rfq.spare.quantity);
  const discount = watch("common.discount", 0);
  const delivery = watch("common.delivery", 0);

  const total = unitPrices.reduce((acc, cur, index) => {
    if (cur && quantities[index]) {
      return acc + cur * quantities[index];
    }
    return acc;
  }, 0);

  const router = useRouter();

  useEffect(() => {
    setValue("common.amount", total - (total * discount) / 100 + delivery);
  }, [total, discount, delivery]);

  const onSubmit = async (data: RFQReplyFormType) => {
    if (selectedCurrency === "") {
      setError("Please select a currency");
      return;
    }
    setLoading(true);
    try {
      for (let i = 0; i < data.rfqs.length; i++) {
        await instance.put(`/rfqs/${props.rfqs[i].id}`, {
          data: {
            unitPrice:
              selectedCurrency === "USD"
                ? data.rfqs[i].unitPrice
                : selectedCurrency === "SGD"
                ? data.rfqs[i].unitPrice * 0.74
                : data.rfqs[i].unitPrice * 0.012,
            quantity: data.rfqs[i].quantity,
            remark: data.common.remark,
            discount: data.common.discount,
            delivery:
              selectedCurrency === "USD"
                ? data.common.delivery
                : selectedCurrency === "SGD"
                ? data.common.delivery * 0.74
                : data.common.delivery * 0.012,
            connectPort: data.common.connectPort,
            connectTime: data.common.connectTime,
            total: 0,
            amount:
              selectedCurrency === "USD"
                ? data.common.amount
                : selectedCurrency === "SGD"
                ? data.common.amount * 0.74
                : data.common.amount * 0.012,
            filled: true,
          },
        });
      }
      const mailBody = `Acknowledgement for Requisition for Quote ${props.rfqs[0].RFQNumber} from ${props.rfqs[0].vendor.name} for ${props.job.shipName} has been submitted. Please find the attached Acknowledgement for Requisition for Quote.`;
      const pdf = createAckPDF({
        shipName: props.job.shipName,
        spareDetails: data.rfqs.map((rfq) => ({
          title: rfq.spare.title,
          description: rfq.spare.description,
          quantity: `${selectedCurrency} ${rfq.spare.quantity}`,
          unitPrice: `${selectedCurrency} ${rfq.unitPrice}`,
        })),
        jobCode: props.rfqs[0].RFQNumber,
        portOfDelivery: props.job.targetPort,
        description: props.job.description || "No Description Available",
        vendor: props.rfqs[0].vendor,
        connectPort: data.common.connectPort,
        deliveryCharge: `${selectedCurrency} ${data.common.delivery}`,
        discount: `${data.common.discount}`,
        deliveryTime: `${data.common.connectTime}`,
        remarks: data.common.remark,
        yourReference: referenceNumber,
        amountPayable: `${selectedCurrency} ${data.common.amount}`,
        subtotal: `${selectedCurrency} ${total}`,
      });
      const formData = new FormData();
      formData.append("vendorId", props.rfqs[0].vendor.id);
      formData.append("attachment", pdf, `acknowledgement.pdf`);
      formData.append("mailBody", mailBody);

      await instance.post(
        `/rfq/${props.rfqs[0].RFQNumber}/send-ack`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      router.push("/vendor/form/rfq/success");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit quotation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[1fr,auto]">
      <Head>
        <title>Vendor Requisition Form</title>
        <meta name="description" content="Vendor Requisition Form" />
      </Head>
      <Header />
      <main className="p-8">
        <p className="text-gray-500 text-lg">
          We would appreciate if you could kindly give us your Best Quotation by
          filling in the form below and clicking the{" "}
          <span className="font-bold italic">Submit Quotation</span> Button
          while connected to the Internet. Please indicate packing expenses
          expected if any. If no packing expense is mentioned separately, it
          will be assumed that packing expense is included in the quoted prices.
        </p>
        <table className="table-auto w-full mt-8">
          <tbody className="border-b-2 border-gray-200">
            <tr className="text-gray-500">
              <td className="py-4 font-bold">RFQ Number:</td>
              <td className="py-4">{props.rfqs[0].RFQNumber}</td>
            </tr>
            <tr className="text-gray-500">
              <td className="py-4 font-bold">Ship Name:</td>
              <td className="py-4">{props.job.shipName}</td>
            </tr>
            <tr className="text-gray-500">
              <td className="py-4 font-bold">Description:</td>
              <td className="py-4">{props.job.description}</td>
            </tr>
            <tr className="text-gray-500">
              <td className="py-4 font-bold">Port Of Delivery:</td>
              <td className="py-4">{props.job.targetPort}</td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto w-full mt-8">
          <thead className="border-b-2 border-gray-200">
            <tr className="text-gray-500">
              <th className="py-4 font-bold">No.</th>
              <th className="py-4 font-bold">Item Name</th>
              <th className="py-4 font-bold">Description</th>
              <th className="py-4 font-bold">Attachments</th>
              <th className="py-4 font-bold">Ordered Quantity</th>
              <th className="py-4 font-bold">Unit Price</th>
            </tr>
          </thead>
          <tbody className="border-b-2 text-center border-gray-200">
            {props.rfqs.map((rfq, index) => (
              <tr
                key={rfq.id}
                className={index == props.rfqs.length - 1 ? "border-b-2" : ""}
              >
                <td className="py-4 w-[5%]">{index + 1}</td>
                <td className="py-4 w-[20%]">{rfq.spare.title}</td>
                <td className="py-4 w-[35%]">{rfq.spare.description}</td>
                <td className="py-4 w-[15%]">
                  <Button onClick={() => downloadAttachments(rfq.spare)}>
                    Download Attatchments
                  </Button>
                </td>
                <td className="py-4 w-[8%]">{rfq.spare.quantity}</td>
                <td className="py-4 w-[10%]">
                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiInputBase-root": {
                        color: "gray",
                      },
                    }}
                    {...register(`rfqs.${index}.unitPrice`, {
                      setValueAs: (value) => {
                        return parseFloat(value || "0.0");
                      },
                      required: "This field is required",
                    })}
                    error={errors.rfqs?.[index]?.unitPrice ? true : false}
                  />
                </td>
              </tr>
            ))}
            <tr className="border-t-2">
              <td colSpan={5} className="py-4 text-right font-bold">
                <span className="mr-2">Total</span>
              </td>
              <td className="py-4">
                <TextField
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "gray",
                    },
                  }}
                  value={total}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="grid grid-cols-[auto,1fr] gap-4 max-w-md mt-8">
          <InputLabel className="text-gray-500">Your Reference:</InputLabel>
          <TextField
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                color: "gray",
              },
            }}
            size="small"
            className="flex-1"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
          />
          <InputLabel className="text-gray-500">
            Your Primary Currency:
          </InputLabel>
          <div className="w-full flex flex-col">
            <Select
              variant="outlined"
              size="small"
              className="flex-1"
              error={error.length > 0}
              value={selectedCurrency}
              onChange={(e) => {
                setSelectedCurrency(e.target.value as string);
                setError("");
              }}
            >
              <MenuItem value="USD">USD($)</MenuItem>
              <MenuItem value="SGD">SGD($)</MenuItem>
              <MenuItem value="INR">INR(₹)</MenuItem>
            </Select>
            <FormHelperText error={error.length > 0}>{error}</FormHelperText>
          </div>
          <InputLabel className="text-gray-500">Discount:</InputLabel>
          <TextField
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                color: "gray",
              },
            }}
            InputProps={{
              endAdornment: "%",
            }}
            size="small"
            className="flex-1"
            {...register("common.discount", {
              setValueAs: (value) => {
                return parseFloat(value || "0.0");
              },
            })}
          />
          <InputLabel className="text-gray-500">Delivery Charge:</InputLabel>
          <TextField
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                color: "gray",
              },
            }}
            size="small"
            className="flex-1"
            {...register("common.delivery", {
              setValueAs: (value) => {
                return parseInt(value || "0");
              },
            })}
          />
          <InputLabel className="text-gray-500">Amount Payable:</InputLabel>
          <TextField
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                color: "gray",
              },
            }}
            size="small"
            className="flex-1"
            disabled
            {...register("common.amount", {
              setValueAs: (value) => {
                return parseFloat(value || "0.0");
              },
            })}
          />
          <InputLabel className="text-gray-500">Delivery Time:</InputLabel>
          <TextField
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                color: "gray",
              },
            }}
            InputProps={{
              endAdornment: "Days",
            }}
            size="small"
            className="flex-1"
            {...register("common.connectTime", {
              required: "This field is required",
              pattern: {
                value: /^[0-9]*$/,
                message: "Only numbers are allowed",
              },
            })}
          />
          <InputLabel className="text-gray-500">Connect Port:</InputLabel>
          <TextField
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                color: "gray",
              },
            }}
            size="small"
            className="flex-1"
            {...register("common.connectPort", {
              required: "This field is required",
            })}
            error={errors.common?.connectPort ? true : false}
            helperText={errors.common?.connectPort?.message as string}
          />
          <InputLabel className="text-gray-500">Remarks:</InputLabel>
          <TextField
            variant="outlined"
            multiline
            rows={4}
            sx={{
              "& .MuiInputBase-root": {
                color: "gray",
              },
            }}
            size="small"
            className="flex-1"
            {...register("common.remark")}
          />
        </div>
        <div className="flex justify-end mt-8">
          <LoadingButton
            loading={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit(onSubmit)}
          >
            Submit Quotation
          </LoadingButton>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  try {
    // Get the rfq hash
    const rfqHash = context.params?.rfqHash;

    const vendorHash = context.params?.vendorHash;

    if (
      !rfqHash ||
      typeof rfqHash !== "string" ||
      !vendorHash ||
      typeof vendorHash !== "string"
    ) {
      return {
        notFound: true,
      };
    }

    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
    if (!ENCRYPTION_KEY) {
      console.warn("ENCRYPTION_KEY is not set");
      return {
        notFound: true,
      };
    }

    const rfqNumber = decrypt(rfqHash, ENCRYPTION_KEY);
    const vendorId = parseInt(decrypt(vendorHash, ENCRYPTION_KEY));

    // Fetch the vendor
    const vendor = await instance.get(`/vendors/${vendorId}`);

    if (!vendor) {
      return {
        notFound: true,
      };
    }

    const rfqs = parseAttributes(
      (
        await instance.get(
          `/rfqs?publicationState=preview&filters[RFQNumber][$eq]=${rfqNumber}&filters[vendor][id][$eq]=${vendorId}&filters[filled][$ne]=true&populate[0]=spare.attachments&populate[1]=vendor`
        )
      ).data
    );

    if (!rfqs || rfqs.length === 0) {
      return {
        notFound: true,
      };
    }

    const job = parseAttributes(
      (await instance.get(`/jobs?filters[spares][id]=${rfqs[0].spare.id}`)).data
    );

    if (!job || job.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        rfqs: rfqs,
        job: job[0],
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    }
    return {
      notFound: true,
    };
  }
};
