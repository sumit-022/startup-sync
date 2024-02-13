import QuoteCompareTable from "@/components/common/purchaseorder/QuoteCompareTable";
import { Mutable } from "@/utils/type-utils";
import { useState } from "react";

export default function Test() {
  const [companies, setCompanies] = useState([
    //@ts-ignore
    {
      name: "Company 1",
      "Spare 1": {
        selected: false,
        total: 100,
        unit: "800",
      },
      "Spare 2": {
        selected: false,
        total: 500,
        unit: "800",
      },
    },
    //@ts-ignore
    {
      name: "Company 2",
      "Spare 1": {
        selected: false,
        total: 500,
        unit: "800",
      },
      "Spare 2": {
        selected: false,
        total: 200,
        unit: "800",
      },
    },
  ]);
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

  const spares = [
    {
      name: "Spare 1",
      "Order Qty": "10",
      "Supply Qty": "20",
    },
    {
      name: "Spare 2",
      "Order Qty": "10",
      "Supply Qty": "20",
    },
  ] as const;

  return (
    <QuoteCompareTable
      spareCols={spareCols as Mutable<typeof spareCols>}
      companyCols={companyCols as Mutable<typeof companyCols>}
      aggregateCols={aggregateCols as Mutable<typeof aggregateCols>}
      spares={spares as Mutable<typeof spares>}
      // @ts-ignore
      companies={companies}
      aggregate={{
        "Company 1": {
          Discount: "10%",
          "Delivery Charge": "20",
          "Amount Payable": "100",
          "Connect Date": "2021-01-01",
          "Connect Port": "Port 1",
          Remark: "Remark 1",
        },
        "Company 2": {
          Discount: "10%",
          "Delivery Charge": "20",
          "Amount Payable": "100",
          "Connect Date": "2021-01-01",
          "Connect Port": "Port 1",
          Remark: "Remark 1",
        },
      }}
      onChange={(companies) => {
        // @ts-ignore
        setCompanies(companies);
      }}
    />
  );
}
