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
      const company = acc.companies.find(
        (c: any) => c.vendor.name === vendor.name
      );
      if (!company) {
        acc.companies.push({
          vendor,
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

  const handleSendPO = async () => {
    const spares = (() => {
      const { vendor, ...spares } = companies[0];
      return Object.keys(spares);
    })();

    const selections: any = {};
    for (const spare of spares) {
      selections[spare] = [];
      for (const company of companies) {
        if (company[spare].selected) {
          selections[spare].push({
            vendor: company.vendor,
            ...company[spare],
            ...(company[spare].quantity = company[spare].orderQty),
          });
        }
      }
    }
    console.log({ selections });

    const vendorObject: any = {};

    for (const spareCategory in selections) {
      const sparesArray = selections[spareCategory];

      for (const spare of sparesArray) {
        const vendorId = spare.vendor.id;

        if (!vendorObject[vendorId]) {
          vendorObject[vendorId] = {
            vendorDetails: spare.vendor as VendorType,
            spares: [],
          };
        }

        vendorObject[vendorId].spares.push({
          spareDetails: spare,
        });
      }
    }
    console.log(vendorObject);

    for (const vendor in vendorObject) {
      createPO({
        poNo: `PO-${job[0].jobCode}`,
        vendor: vendorObject[vendor].vendorDetails,
        spares: vendorObject[vendor].spares,
        vesselName: job[0].shipName,
      });
    }
  };

  const [companies, setCompanies] = useState<any[]>(initCompanies);
  const [spares, setSpares] = useState<any[]>(initSpares);

  const aggregate = rfqs.reduce((acc, cur) => {
    const rfqvendor = cur.vendor;
    const { vendor, ...spares } =
      companies.find((c) => c.vendor.id === rfqvendor.id) || {};

    const total = Object.keys(spares).reduce((acc, cur) => {
      return acc + spares[cur].total;
    }, 0);

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
          onClick={handleSendPO}
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
