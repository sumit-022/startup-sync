import { Mutable } from "@/utils/type-utils";
import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import parseAttributes from "@/utils/parse-data";
import instance from "@/config/axios.config";
import dynamic from "next/dynamic";
import DashboardLayout from "@/components/layout";
import { Button, Typography } from "@mui/material";
import createPO from "@/utils/create-po";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";
import logo from "@/assets/image/logo.jpg";
import AuthContext from "@/context/AuthContext";
const QuoteCompareTable = dynamic(
  () => import("@/components/common/purchaseorder/QuoteCompareTable"),
  { ssr: false }
);

type PageProps = {
  rfqs: any[];
  job: JobType[];
};

export default function QuoteComparisionPage({ rfqs, job }: PageProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_FRONTEND_URL;
  console.log(
    `<img src="${baseUrl}/logo.png" alt="Shinpo Engineering Pte Ltd" style="width: 100px;height: 100px;"/>`
  );
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
    setLoading(true);
    const spareNames = (() => {
      const { vendor, ...spares } = companies[0];
      return Object.keys(spares);
    })();

    const selections: any = {};
    for (const spare of spareNames) {
      selections[spare] = [];
      for (const company of companies) {
        if (company[spare].selected) {
          selections[spare].push({
            vendor: company.vendor,
            ...aggregate[company.vendor.name],
            ...company[spare],
          });
        }
      }
    }

    const vendorObject: any = {};

    for (const spareName in selections) {
      const sparesArray = selections[spareName];

      for (const spare of sparesArray) {
        const vendorId = spare.vendor.id;

        if (!vendorObject[vendorId]) {
          vendorObject[vendorId] = {
            vendorDetails: spare.vendor as VendorType,
            spares: [],
          };
        }

        vendorObject[vendorId].spares.push({
          spareDetails: {
            ...spares.find((s) => s.name === spare.title),
            ...spare,
          },
        });
      }
    }

    const vendors = [];

    for (const vendor in vendorObject) {
      vendors.push({
        id: vendorObject[vendor].vendorDetails.id,
        attachment: `${vendorObject[vendor].vendorDetails.id}.pdf`,
        body: `Dear Sir / Madam<br/>Good Day,<br/><br/>We are pleased to place the order for subject enquiry as per your quotes received under reference number PO-${job[0].jobCode}<br/><br/>We request to rechek the quantity ordered, price and other terms as per the attached PDF copy of Purchase Order.<br/><br/>Please note below for the submission of your invoices.<br/>•	Kindly send the copy of invoice as per our policy to avoid any rejections and delay in process.<br/>•	All the invoices shall only be addressed to accounts@shinpoengineering.com<br/>• Send only one invoice per email as a PDF file<br/>• Ensure that the purchase order no ,Job code no are clearly stated on the invoice<br/>• Ensure that full banking details are clearly stated on the invoice<br/>•	Ensure that vessel name, job description and pricing are clearly mentioned on the invoice<br/>• Ensure the copy of quotes is/are attached with the invoice<br/>• Ensure time sheets are attached and signed off by Shinpo representative<br/>• Ask your Shinpo Engineering representative for clarification if any doubt<br/><br/>We look forward for more business with you in future<br/><br/>Thanks with Regards<br/><div style="display:flex;gap:20px"><img src="https://jobs.shinpoengineering.com/logo.png" alt="Shinpo Engineering Pte Ltd" style="width: 140px;height: 70px;margin-right:10px"/><div><p style="font-weight: 700;color:blue;font-size:20;margin:0">${user?.fullname}</p>Shinpo Engineering Pte. Ltd.<br/><br/><p style="margin:0;padding:0">Procurement Department</p><p style="margin:0;padding:0;color:blue">Email: purchase@shinpoengineering.com</p><p style="color:blue;padding:0;margin:0;">1 Tuas South Avenue 6 #05-20 
        The Westcom Singapore 637021</p>Tel: +65 65399007<br/>www.shinpoengineering.com
        </div></div>`,
      });
    }
    //change the vendors array into formData and send it to the backend
    const form = new FormData();
    form.append("vendors", JSON.stringify(vendors));
    for (const vendor in vendorObject) {
      form.append(
        "attachments",
        createPO({
          poNo: `PO-${job[0].jobCode}`,
          vendor: vendorObject[vendor].vendorDetails,
          spares: vendorObject[vendor].spares,
          vesselName: job[0].shipName,
        }),
        `${vendorObject[vendor].vendorDetails.id}.pdf`
      );
    }
    instance
      .post(`/job/send-po`, form)
      .then((res) => {
        toast.success("Purchase Order Sent Successfully");
        instance.put(`/jobs/${job[0].id}`, {
          purchaseStatus: "POISSUED",
        });
        router.push("/dashboard/purchase");
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error sending Purchase Order");
      })
      .finally(() => {
        setLoading(false);
      });
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
        <LoadingButton
          variant="contained"
          color="primary"
          className="bg-blue-500"
          onClick={handleSendPO}
          loading={loading}
        >
          Generate Purchase Order
        </LoadingButton>
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
