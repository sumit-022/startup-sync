import React from "react";
import instance from "@/config/axios.config";
import { decrypt } from "@/utils/crypt";
import { GetServerSideProps } from "next";
import Header from "@/components/layout/header/rfq";
import parseAttributes from "@/utils/parse-data";
import { Button, InputAdornment, InputLabel, TextField } from "@mui/material";

type PageProps = {
  rfqs: any[];
  job: JobType;
};

export default function RfqHash(props: PageProps) {
  console.log(props);

  const [taxes, setTaxes] = React.useState<
    {
      name: string;
      value: number;
    }[]
  >([]);

  const [total, setTotal] = React.useState<number>(0);

  const downloadAttachments = (attachments: any[]) => () => {
    console.log(attachments);
  };

  return (
    <div className="grid grid-rows-[1fr,auto]">
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
              <th className="py-4 font-bold">Quantity</th>
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
                <td className="py-4 w-[50%]">{rfq.spare.description}</td>
                <td className="py-4 w-[15%]">
                  <Button onClick={downloadAttachments(rfq.spare.attachments)}>
                    Download Attatchments
                  </Button>
                </td>
                <td className="py-4">{rfq.spare.quantity}</td>
                <td className="py-4 w-[10%]">
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    sx={{
                      "& .MuiInputBase-root": {
                        color: "gray",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">SGD</InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      const newRfqs = [...props.rfqs];
                      newRfqs[index].spare.unitPrice = value;
                      setTotal(
                        newRfqs.reduce(
                          (acc, rfq) =>
                            acc + rfq.spare.unitPrice * rfq.spare.quantity,
                          0
                        )
                      );
                    }}
                  />
                </td>
              </tr>
            ))}
            {taxes.length == 0 ? (
              <tr>
                <td colSpan={6} className="text-gray-500 py-4">
                  <Button onClick={() => setTaxes([{ name: "", value: 0 }])}>
                    Add Tax
                  </Button>
                </td>
              </tr>
            ) : (
              taxes.map((tax, index) => (
                <tr key={index}>
                  <td className="py-4" colSpan={3}>
                    <Button
                      onClick={() => {
                        const newTaxes = [...taxes];
                        console.log({ newTaxes, index });
                        newTaxes.splice(index, 1);
                        setTaxes(newTaxes);
                        console.log(taxes);
                        const totalTaxes = taxes.reduce(
                          (acc, tax) => acc + tax.value,
                          0
                        );
                        setTotal(
                          props.rfqs.reduce(
                            (acc, rfq) =>
                              acc + rfq.spare.unitPrice * rfq.spare.quantity,
                            0
                          ) +
                            (props.rfqs.reduce(
                              (acc, rfq) =>
                                acc + rfq.spare.unitPrice * rfq.spare.quantity,
                              0
                            ) *
                              totalTaxes) /
                              100
                        );
                      }}
                    >
                      Remove Tax
                    </Button>
                    <Button
                      onClick={() =>
                        setTaxes([...taxes, { name: "", value: 0 }])
                      }
                    >
                      Add Tax
                    </Button>
                  </td>
                  <td className="py-4" colSpan={2}>
                    <TextField
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiInputBase-root": {
                          color: "gray",
                        },
                      }}
                      className="w-full"
                      placeholder="Tax Name"
                    />
                  </td>
                  <td className="py-4">
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      sx={{
                        "& .MuiInputBase-root": {
                          color: "gray",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        const newTaxes = [...taxes];
                        newTaxes[index].value = value;
                        setTaxes(newTaxes);
                        const totalTaxes = taxes.reduce(
                          (acc, tax) => acc + tax.value,
                          0
                        );
                        setTotal(
                          props.rfqs.reduce(
                            (acc, rfq) =>
                              acc + rfq.spare.unitPrice * rfq.spare.quantity,
                            0
                          ) +
                            (props.rfqs.reduce(
                              (acc, rfq) =>
                                acc + rfq.spare.unitPrice * rfq.spare.quantity,
                              0
                            ) *
                              totalTaxes) /
                              100
                        );
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
            <tr className="border-t-2">
              <td colSpan={5} className="py-4 text-right font-bold">
                <span className="mr-2">Total</span>
              </td>
              <td className="py-4">
                <TextField
                  variant="outlined"
                  value={total}
                  size="small"
                  type="number"
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "gray",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">SGD</InputAdornment>
                    ),
                  }}
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
            type="number"
            className="flex-1"
          />
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
            type="number"
            className="flex-1"
          />
          <InputLabel className="text-gray-500">Delivery Charge:</InputLabel>
          <TextField
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                color: "gray",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">SGD</InputAdornment>
              ),
            }}
            size="small"
            type="number"
            className="flex-1"
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
            type="number"
            className="flex-1"
          />
          <InputLabel className="text-gray-500">Remarks:</InputLabel>
          <TextField
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                color: "gray",
              },
            }}
            size="small"
            type="text"
            className="col-span-2"
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
            type="text"
            className="col-span-2"
          />
          <InputLabel className="text-gray-500">Lead Time:</InputLabel>
          <TextField
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                color: "gray",
              },
            }}
            size="small"
            InputProps={{
              endAdornment: "Days",
            }}
            type="text"
            className="col-span-2"
          />
        </div>
        <div className="flex justify-end mt-8">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit Quotation
          </button>
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
          `/rfqs?publicationState=preview&filters[RFQNumber][$eq]=${rfqNumber}&filters[vendor][id][$eq]=${vendorId}&populate=spare.attachments`
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
