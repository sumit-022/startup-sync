import { Mutable } from "@/utils/type-utils";
import { useState } from "react";
import { GetServerSideProps } from "next";
import parseAttributes from "@/utils/parse-data";
import instance from "@/config/axios.config";
import dynamic from "next/dynamic";
import DashboardLayout from "@/components/layout";
import { Button, Typography } from "@mui/material";
const QuoteCompareTable = dynamic(
  () => import("@/components/common/purchaseorder/QuoteCompareTable"),
  { ssr: false }
);

type PageProps = {
  rfqs: any[];
};

export default function QuoteComparisionPage({ rfqs }: PageProps) {
  console.log({ rfqs });

  const spareCols = ["Supply Qty", "Order Qty"] as const;
  const companyCols = ["unit"] as const;
  const aggregateCols = [
    "Discount",
    "Delivery Charge",
    "Amount Payable",
    "Connect Date",
    "Connect Port",
    "Remark",
  ] as const;

  const spares = rfqs.map((rfq) => ({
    name: rfq.spare.title,
    "Supply Qty": "3",
    "Order Qty": rfq.spare.quantity,
  }));

  const { companies } = rfqs.reduce(
    (acc, cur) => {
      const vendor = cur.vendor;
      const spare = cur.spare;
      const company = acc.companies.find((c: any) => c.name === vendor.name);
      if (!company) {
        acc.companies.push({
          name: vendor.name,
          [spare.title]: { ...spare, total: cur.total, unit: cur.unitPrice },
        });
      } else {
        company[spare.title] = {
          ...spare,
          total: cur.total,
          unit: cur.unitPrice,
        };
      }
      return acc;
    },
    {
      companies: [],
    }
  );

  const aggregate = rfqs.reduce((acc, cur) => {
    const vendor = cur.vendor;
    acc[vendor.name] = {
      Discount: `${cur.discount}%`,
      "Amount Payable": cur.total,
      "Connect Date": cur.connectDate,
      "Connect Port": cur.connectPort,
      "Delivery Charge": cur.delivery,
      Remark: cur.remark,
    };
    return acc;
  }, {});
  return (
    <DashboardLayout header sidebar>
      <Typography
        variant="h4"
        textAlign="center"
        color="gray"
        sx={{
          mb: 2,
        }}
      >
        Quote Comparison
      </Typography>
      <QuoteCompareTable
        spareCols={spareCols as Mutable<typeof spareCols>}
        companyCols={companyCols as Mutable<typeof companyCols>}
        aggregateCols={aggregateCols as Mutable<typeof aggregateCols>}
        //@ts-ignore
        companies={companies}
        aggregate={aggregate}
        spares={spares}
      />
      <div className="flex justify-end mt-6">
        <Button variant="contained" color="primary" className="bg-blue-500">
          Generate Purchase Order
        </Button>
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const rfqNumber = context.params?.rfq as string;
  if (!rfqNumber)
    return {
      notFound: true,
    };
  const rfqs = parseAttributes(
    await instance.get(
      `/rfqs?publicationState=preview&filters[RFQNumber][$eq]=${rfqNumber}&populate[0]=spare.attachments&populate[1]=vendor&populate[2]=quantity`
    )
  );
  if (rfqs.length === 0)
    return {
      notFound: true,
    };
  console.log({ rfqs });

  return {
    props: {
      rfqs,
    },
  };
};
