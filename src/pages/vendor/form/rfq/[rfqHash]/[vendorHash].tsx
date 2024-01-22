import React from "react";
import instance from "@/config/axios.config";
import { decrypt } from "@/utils/crypt";
import { GetServerSideProps } from "next";
import Header from "@/components/layout/header/rfq";
import parseAttributes from "@/utils/parse-data";
import { TextField } from "@mui/material";

type PageProps = {
  rfqs: any[];
  job: JobType;
};

export default function RfqHash(props: PageProps) {
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
              <th className="py-4 font-bold">Quantity</th>
              <th className="py-4 font-bold">Unit Price</th>
            </tr>
          </thead>
          <tbody className="border-b-2 text-center border-gray-200">
            {props.rfqs.map((rfq, index) => (
              <tr key={rfq.id}>
                <td className="py-4 w-[5%]">{index + 1}</td>
                <td className="py-4 w-[20%]">{rfq.spare.title}</td>
                <td className="py-4 w-[50%]"></td>
                <td className="py-4">{rfq.spare.quantity}</td>
                <td className="py-4 w-[10%]">
                  <TextField variant="outlined" size="small" type="number" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          `/rfqs?publicationState=preview&filters[RFQNumber][$eq]=${rfqNumber}&filters[vendor][id][$eq]=${vendorId}&populate=spare`
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
