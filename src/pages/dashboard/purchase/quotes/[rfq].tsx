import { Mutable } from "@/utils/type-utils";
import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import parseAttributes from "@/utils/parse-data";
import instance from "@/config/axios.config";
import dynamic from "next/dynamic";
import DashboardLayout from "@/components/layout";
import { Checkbox, TextField, Typography } from "@mui/material";
import createPO from "@/utils/create-po";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthContext from "@/context/AuthContext";
import FormHeading from "@/components/atoms/heading/form-heading";
import axios from "axios";
const QuoteCompareTable = dynamic(
  () => import("@/components/common/purchaseorder/QuoteCompareTable"),
  { ssr: false }
);

type PageProps = {
  rfqs: any[];
  job: JobType[];
  rates: Record<string, number>;
};

export default function QuoteComparisionPage({ rfqs, job, rates }: PageProps) {
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    default: true,
    address:
      "Startup Sync, Indian Institute of Technology, Lucknow, Uttar Pradesh, India, 226002",
  });
  const [remarks, setRemarks] = useState("");
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const spareCols = ["Supply Qty"] as const;
  const companyCols = ["unit"] as const;
  const aggregateCols = [
    "Discount",
    "Delivery Charge",
    "Quality of Spare",
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
      const currencyCode = cur.currencyCode;
      const conversionRate = rates[currencyCode] ?? 1;
      if (!company) {
        acc.companies.push({
          vendor,
          [spare.id]: {
            ...spare,
            total:
              cur.unitPrice === null
                ? null
                : (cur.unitPrice * spare.quantity) / conversionRate,
            unit:
              cur.unitPrice === null ? null : cur.unitPrice / conversionRate,
            selected: false,
          },
          currencyCode,
        });
      } else {
        company[spare.id] = {
          ...spare,
          total:
            cur.unitPrice === null
              ? null
              : (cur.unitPrice * spare.quantity) / conversionRate,
          unit: cur.unitPrice === null ? null : cur.unitPrice / conversionRate,
        };
      }

      if (!acc.spares.find((s: any) => s.id === spare.id)) {
        acc.spares.push({
          id: spare.id,
          name: spare.title,
          "Supply Qty": spare.quantity,
          orderQty: spare.quantity,
          qtyUnit: spare.quantityUnit || "",
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
    try {
      setLoading(true);
      const spareNames = (() => {
        const { vendor, currencyCode, ...spares } = companies[0];
        return Object.keys(spares);
      })();

      const selections: any = {};
      for (const spare of spareNames) {
        selections[spare] = [];
        for (const company of companies) {
          if (company[spare].selected) {
            selections[spare].push({
              vendor: company.vendor,
              currencyCode: company.currencyCode,
              ...aggregate[company.vendor.name],
              ...company[spare],
            });
          }
        }
      }

      const vendorObject: any = {};

      // replace selections spare data with the og data from rfqs
      const oldSelections: any = {};
      for (const spare of spareNames) {
        oldSelections[spare] = selections[spare].map((s: any) => {
          const rfq = rfqs.find(
            (r) => r.spare.id === s.id && r.vendor.id === s.vendor.id
          );
          return {
            ...rfq,
            ...s,
          };
        });
      }

      for (const spareName in oldSelections) {
        const sparesArray = oldSelections[spareName];

        for (const spare of sparesArray) {
          const vendorId = spare.vendor.id;

          if (!vendorObject[vendorId]) {
            vendorObject[vendorId] = {
              vendorDetails: spare.vendor as VendorType,
              spares: [],
              currencyCode: spare.currencyCode,
            };
          }

          vendorObject[vendorId].spares.push({
            spareDetails: {
              ...spares.find((s) => s.id === spare.id),
              ...spare,
              total: spare.unitPrice * spare.quantity,
            },
          });
        }
      }

      const vendors = [];

      for (const vendor in vendorObject) {
        vendors.push({
          id: vendorObject[vendor].vendorDetails.id,
          subject: ` P.O-${job[0].jobCode} - ${job[0].description}`,
          attachment: `${vendorObject[vendor].vendorDetails.id}.pdf`,
          body: `Dear Sir / Madam<br/>Good Day,<br/><br/>We are pleased to place the order for subject enquiry as per your quotes received under reference number PO-${job[0].jobCode}<br/><br/>We request to rechek the quantity ordered, price and other terms as per the attached PDF copy of Purchase Order.<br/><br/>Please note below for the submission of your invoices.<br/>•	Kindly send the copy of invoice as per our policy to avoid any rejections and delay in process.<br/>•	All the invoices shall only be addressed to accounts@company.com<br/>• Send only one invoice per email as a PDF file<br/>• Ensure that the purchase order no ,Job code no are clearly stated on the invoice<br/>• Ensure that full banking details are clearly stated on the invoice<br/>•	Ensure that vessel name, job description and pricing are clearly mentioned on the invoice<br/>• Ensure the copy of quotes is/are attached with the invoice<br/>• Ensure time sheets are attached and signed off by Company representative<br/>• Ask your [Company Name] representative for clarification if any doubt<br/><br/>We look forward for more business with you in future<br/><br/>Thanks with Regards<br/>`,
        });
      }

      const blobs: { [x: string]: Blob } = {};

      const form = new FormData();
      form.append("vendors", JSON.stringify(vendors));
      for (const vendor in vendorObject) {
        const blob = await createPO({
          poNo: `PO-${job[0].jobCode}`,
          vendor: vendorObject[vendor].vendorDetails,
          aggregate: {
            discount: vendorObject[vendor].spares[0].spareDetails.discount,
            deliveryCharge:
              vendorObject[vendor].spares[0].spareDetails.delivery,
          },
          currencyCode: vendorObject[vendor].currencyCode,
          spares: vendorObject[vendor].spares.map((s: any) => {
            return {
              ...s.spareDetails,
            };
          }),
          deliveryAddress: deliveryAddress.address,
          remarks,
          vesselName: job[0].shipName,
        });
        blobs[vendorObject[vendor].vendorDetails.id] = blob;
        form.append(
          "attachments",
          blob,
          `${vendorObject[vendor].vendorDetails.id}.pdf`
        );
      }
      await instance.post(`/job/send-po`, form);
      toast.success("Purchase Order Sent Successfully");
      await instance.put(`/jobs/${job[0].id}`, {
        data: {
          purchaseStatus: "POISSUED",
        },
      });
      await Promise.allSettled(
        vendors.map((v) => {
          const form = new FormData();
          form.append("vendorId", v.id);
          form.append("jobCode", job[0].jobCode);
          form.append("attachments", blobs[v.id]);
          return instance.post(`/purchase-order/save`, form);
        })
      );
      router.push("/dashboard/purchase");
      return;
    } catch (err) {
      toast.error("Failed to send purchase order");
    }
    setLoading(false);
  };

  const [companies, setCompanies] = useState<any[]>(initCompanies);
  const [spares, setSpares] = useState<any[]>(initSpares);

  const aggregate = rfqs.reduce((acc, cur) => {
    const rfqvendor = cur.vendor;
    const { vendor, currencyCode, ...spares } =
      companies.find((c) => c.vendor.id === rfqvendor.id) || {};

    const total = Object.keys(spares).reduce((acc, cur) => {
      return acc + spares[cur].total;
    }, 0);

    acc[vendor.name] = {
      Discount: `${cur.discount}%`,

      "Amount Payable":
        Math.round(
          (((1 - (cur.discount || 0) * 0.01) * total + cur.delivery) /
            (rates[currencyCode] ?? 1)) *
            100
        ) / 100,
      "Connect Date": `${cur.connectTime} Days`,
      "Connect Port": cur.connectPort,
      "Delivery Charge": cur.delivery / (rates[currencyCode] ?? 1),
      "Quality of Spare": cur.quality,
      Remark: cur.remark,
    };
    return acc;
  }, {});

  const data = rfqs.reduce((acc, cur) => {
    const rfqvendor = cur.vendor;
    const { vendor, currencyCode, ...spares } =
      companies.find((c) => c.vendor.id === rfqvendor.id) || {};

    acc[vendor.name] = Object.keys(spares).reduce((acc, cur) => {
      const spare = spares[cur];
      return {
        ...acc,
        [cur]: {
          ...spare,
          total: Math.round(spare.total * 100) / 100,
          unit: Math.round(spare.unit * 100) / 100,
          selected: false,
        },
      };
    }, {});
    return acc;
  }, {});

  let VendorIds: any[] = [];
  let productIDs: any[] = [];
  let Price: any[] = [];
  let DeliveryDays: any[] = [];

  for (const vendor in data) {
    const factor = Object.keys(data[vendor]).length;
    for (let i = 0; i < factor; i++) {
      VendorIds.push(vendor);
    }

    for (const spare in data[vendor]) {
      productIDs.push(data[vendor][spare].id);
      Price.push(data[vendor][spare].unit);
      DeliveryDays.push(
        parseInt(aggregate[vendor]["Connect Date"].split(" ")[0])
      );
    }
  }

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/predict-vendor",
          {
            VendorID: VendorIds,
            ProductID: productIDs,
            Price: Price,
            DeliveryDays: DeliveryDays,
            OnTimeDeliveryRate: Array(VendorIds.length).fill(
              Math.floor(Math.random() * 11) + 90
            ),
            OrderAccuracyRate: Array(VendorIds.length).fill(
              Math.floor(Math.random() * 11) + 90
            ),
            ResponseTime: Array(VendorIds.length).fill(
              Math.floor(Math.random() * 15) + 14
            ),
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPredictions();
  }, []);

  const weights = {
    Price: -0.6,
    DeliveryDays: 0.25,
    OnTimeDeliveryRate: 0.05,
    OrderAccuracyRate: 0.05,
    ResponseTime: -0.05,
  };
  const calculateScore = (data: {
    VendorID: string[];
    ProductID: string[];
    Price: number[];
    DeliveryDays: number[];
    OnTimeDeliveryRate: number[];
    OrderAccuracyRate: number[];
    ResponseTime: number[];
  }) => {
    let scores: number[] = [];
    for (let i = 0; i < data.VendorID.length; i++) {
      let score = 0;
      for (const key in weights) {
        //@ts-ignore
        score += data[key][i] * weights[key];
      }
      scores.push(score);
    }
    return scores;
  };

  console.log(
    calculateScore({
      VendorID: VendorIds,
      ProductID: productIDs,
      Price: Price,
      DeliveryDays: DeliveryDays,
      OnTimeDeliveryRate: Array(VendorIds.length).fill(
        Math.floor(Math.random() * 11) + 90
      ),
      OrderAccuracyRate: Array(VendorIds.length).fill(
        Math.floor(Math.random() * 11) + 90
      ),
      ResponseTime: Array(VendorIds.length).fill(
        Math.floor(Math.random() * 15) + 14
      ),
    })
  );

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
      <div className="overflow-x-auto">
        <QuoteCompareTable
          mode="edit"
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
      </div>
      <TextField
        multiline
        rows={4}
        label="Remarks"
        fullWidth
        value={remarks}
        onChange={(e) => {
          setRemarks(e.target.value);
        }}
        sx={{
          mt: 4,
        }}
      />
      <div className="mt-3">
        <FormHeading heading="Delivery Address" />
        <div className="flex items-center">
          <Checkbox
            checked={deliveryAddress.default}
            onChange={() => {
              setDeliveryAddress((prev) => ({
                ...prev,
                default: !prev.default,
              }));
            }}
          />
          <Typography variant="body1" color="gray">
            Same as Billing Address
          </Typography>
        </div>
        {!deliveryAddress.default && (
          <TextField
            multiline
            disabled={deliveryAddress.default}
            rows={4}
            label="Enter Delivery Address"
            fullWidth
            onChange={(e) => {
              setDeliveryAddress((prev) => ({
                ...prev,
                address: e.target.value,
              }));
            }}
            sx={{
              mt: 1,
            }}
          />
        )}
      </div>
      <div className="flex justify-end mt-6">
        <LoadingButton
          variant="contained"
          color="primary"
          loading={loading}
          className="bg-blue-500"
          onClick={handleSendPO}
          disabled={(() => {
            const spareNames = (() => {
              const { vendor, currencyCode, ...spares } = companies[0];
              return Object.keys(spares);
            })();

            let numSelections = 0;
            for (const spare of spareNames) {
              for (const company of companies) {
                if (company[spare].selected) {
                  numSelections++;
                }
              }
            }

            if (numSelections === 0) return true;
            return false;
          })()}
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
      `/rfqs?filters[RFQNumber][$eq]=${rfqNumber}&filters[filled]=true&populate[0]=spare.attachments&populate[1]=vendor&populate[2]=quantity&pagination[page]=1&pagination[pageSize]=1000`
    )
  );
  if (rfqs.length === 0)
    return {
      notFound: true,
    };

  const job = parseAttributes(
    (await instance.get(`/jobs?filters[spares][id]=${rfqs[0].spare.id}`)).data
  );

  const rawRates = parseAttributes(
    (
      await instance.get(
        "/currencies?pagination[page]=1&pagination[pageSize]=200"
      )
    ).data.data
  ) as { code: string; rate: number }[];

  const rates = Object.fromEntries(
    rawRates.map(({ code, rate }) => [code, Math.round(rate * 100) / 100])
  );

  if (!job || job.length === 0) {
    return {
      notFound: true,
    };
  }

  // Clean the spare names
  rfqs.forEach((rfq: any) => {
    const spare = rfq.spare;
    spare.title = spare.title.trim();
  });

  return {
    props: {
      rfqs,
      job,
      rates,
    },
  };
};
