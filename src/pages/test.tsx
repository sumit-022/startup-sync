import QuoteCompareTable from "@/components/common/purchaseorder/QuoteCompareTable";
import { Mutable } from "@/utils/type-utils";

export default function Test() {
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
      "Order Qty": "2",
      "Supply Qty": "1",
    },
    {
      name: "Spare 2",
      "Order Qty": "3",
      "Supply Qty": "4",
    },
    {
      name: "Spare 3",
      "Order Qty": "5",
      "Supply Qty": "6",
    },
  ] as const satisfies ({
    [x in (typeof spareCols)[number]]: string;
  } & { name: string })[];

  const companies = [
    {
      name: "Company 1",
      "Spare 1": {
        selected: true,
        total: 100,
        unit: "D",
      },
      "Spare 2": {
        selected: true,
        total: 200,
        unit: "W",
      },
      "Spare 3": {
        selected: true,
        total: 300,
        unit: "M",
      },
    },
  ] as const satisfies ({
    [s in (typeof spares)[number]["name"]]: {
      [x in (typeof companyCols)[number]]: string;
    } & {
      selected: boolean;
      total: number;
    };
  } & {
    name: string;
  })[];

  const aggregate = {
    "Company 1": {
      Discount: "10%",
      "Amount Payable": "1000",
      "Connect Date": "2022-01-01",
      "Connect Port": "Port 1",
      "Delivery Charge": "100",
      Remark: "Remark 1",
    },
  } as const satisfies {
    [company in (typeof companies)[number]["name"]]: {
      [x in (typeof aggregateCols)[number]]: string;
    };
  };

  return (
    <QuoteCompareTable
      spareCols={spareCols as Mutable<typeof spareCols>}
      companyCols={companyCols as Mutable<typeof companyCols>}
      aggregateCols={aggregateCols as Mutable<typeof aggregateCols>}
      spares={spares}
      // @ts-ignore
      companies={companies}
      aggregate={aggregate}
    />
  );
}
