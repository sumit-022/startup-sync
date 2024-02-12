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

  return (
    <QuoteCompareTable
      spareCols={spareCols as Mutable<typeof spareCols>}
      companyCols={companyCols as Mutable<typeof companyCols>}
      aggregateCols={aggregateCols as Mutable<typeof aggregateCols>}
    />
  );
}
