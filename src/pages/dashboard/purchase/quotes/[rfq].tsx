import { Mutable } from "@/utils/type-utils";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import parseAttributes from "@/utils/parse-data";
import instance from "@/config/axios.config";
import dynamic from "next/dynamic";
import DashboardLayout from "@/components/layout";
import { Button, Typography } from "@mui/material";
import createPO from "@/utils/create-po";
const QuoteCompareTable = dynamic(
  () => import("@/components/common/purchaseorder/QuoteCompareTable"),
  { ssr: false }
);

type PageProps = {
  rfqs: any[];
  job: JobType[];
};

export default function QuoteComparisionPage({ rfqs, job }: PageProps) {
  console.log({ job });

  const spareCols = ["Supply Qty"] as const;
  const companyCols = ["unit"] as const;
  const aggregateCols = [
    "Discount",
    "Delivery Charge",
    "Amount Payable",
    "Connect Date",
    "Connect Port",
    "Remark",
  ] as const;

  const { companies: initCompanies, spares: initSpares } = rfqs.reduce(
    (acc, cur) => {
      const vendor = cur.vendor;
      const spare = cur.spare;
      const company = acc.companies.find((c: any) => c.name === vendor.name);
      if (!company) {
        acc.companies.push({
          name: vendor.name,
          [spare.title]: {
            ...spare,
            total: cur.unitPrice * spare.quantity,
            unit: cur.unitPrice,
            selected: false,
          },
        });
      } else {
        company[spare.title] = {
          ...spare,
          total: cur.unitPrice * spare.quantity,
          unit: cur.unitPrice,
        };
      }
      if (!acc.spares.find((s: any) => s.name === spare.title)) {
        acc.spares.push({
          name: spare.title,
          "Supply Qty": spare.quantity,
          orderQty: spare.quantity,
        });
      }
      return acc;
    },
    {
      companies: [],
      spares: [],
    }
  );

  const [companies, setCompanies] = useState<any[]>(initCompanies);
  const [spares, setSpares] = useState<any[]>(initSpares);

  const aggregate = rfqs.reduce((acc, cur) => {
    const vendor = cur.vendor;
    console.log({ companies, name: vendor.name });
    const { name, ...spares } = companies.find(
      (c) => c.name === vendor.name
    ) || { name: "" };

    const total = Object.keys(spares).reduce((acc, cur) => {
      return acc + spares[cur].total;
    }, 0);

    console.log({ total });

    acc[vendor.name] = {
      Discount: `${cur.discount}%`,
      "Amount Payable": (1 - (cur.discount || 0) * 0.01) * total + cur.delivery,
      "Connect Date": `${cur.connectTime} Days`,
      "Connect Port": cur.connectPort,
      "Delivery Charge": cur.delivery,
      Remark: cur.remark,
    };
    return acc;
  }, {});
  console.log({ rfqs, companies, spares, aggregate });

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
        onChange={(companies, spares) => {
          setCompanies(companies);
          setSpares(spares);
        }}
      />
      <div className="flex justify-end mt-6">
        <Button
          variant="contained"
          color="primary"
          className="bg-blue-500"
          onClick={() => {
            createPO({
              poNo: `PO-${job[0].jobCode}`,
              vesselName: job[0].shipName,
              spares,
              subtotal: 0,
              gst: 0,
              total: 0,
              vendor: {},
            });
          }}
        >
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
      `/rfqs?publicationState=preview&filters[RFQNumber][$eq]=${rfqNumber}&filters[filled]=true&populate[0]=spare.attachments&populate[1]=vendor&populate[2]=quantity`
    )
  );
  if (rfqs.length === 0)
    return {
      notFound: true,
    };
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
      rfqs,
      job,
    },
  };
};
