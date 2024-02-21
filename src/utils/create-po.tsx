import jsPDF, { TableConfig } from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "@/assets/image/logo.jpg";

type POType = {
  poNo: string;
  vesselName: string;
  spares: any[];
  vendor: any;
};
export default function createPO(data?: POType) {
  const doc = new jsPDF();
  const today = new Date();
  const tableConfig: TableConfig = {
    autoSize: true,
    headerBackgroundColor: "#dce9f1",
    headerTextColor: "#5097ce",
  };

  const body = data?.spares.map((spare, index) => [
    index + 1,
    spare.spareDetails.title,
    spare.spareDetails.description,
    spare.spareDetails.orderQty,
    spare.spareDetails.unit,
    spare.spareDetails.total,
  ]);

  const subtotal = data?.spares.reduce(
    (acc, cur) => acc + cur.spareDetails.total,
    0
  );

  const discount = data?.spares[0]?.spareDetails.Discount;
  const discountDecimal = Number(discount.replace("%", "")) / 100;

  const total =
    subtotal +
    data?.spares[0]?.spareDetails["Delivery Charge"] -
    discountDecimal *
      (subtotal + data?.spares[0]?.spareDetails["Delivery Charge"]);

  const termsandConditions = [
    "Kindly send the copy of invoice as per our policy to avoid any rejections and delay in process.",
    "All the invoices shall only be addressed to accounts@shinpoengineering.com",
    "Send only one invoice per email as a PDF file ",
    "Ensure that the purchase order no ,Job code no are clearly stated on the invoice",
    "Ensure that full banking details are clearly stated on the invoice",
    "Ensure that vessel name, job description and pricing are clearly mentioned on the invoice",
    "Ensure the copy of quotes is/are attached with the invoice",
    "Ensure time sheets are attached and signed off by Shinpo representative",
    "Ask your Shinpo Engineering representative for clarification if any doubt",
  ];

  doc.addImage(logo.src, "JPEG", 15, 15, 45, 30);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Purchase Order", 150, 25);
  doc.setFontSize(16);
  doc.text("Shinpo Engineering PTE. LTD.", 15, 60);
  doc.setFontSize(12);
  doc.text("Purchase Order", 15, 70);
  doc.text("Our Order Date", 85, 70);
  doc.text("Vessel Name", 150, 70);
  doc.setFont("helvetica", "normal");
  doc.text(data?.poNo || "PO", 15, 80);
  // doc.text("01/01/2022", 85, 80);
  doc.text(today.toLocaleDateString(), 85, 80);
  doc.text(data?.vesselName || "Vessel Name", 150, 80);
  doc.setLineWidth(0.5);
  doc.line(15, 85, 195, 85);
  doc.setFont("helvetica", "bold");
  // supplier address
  doc.text("Supplier Address", 15, 95);
  doc.setFont("helvetica", "normal");
  doc.text(data?.vendor.name, 15, 105);
  const address = doc.splitTextToSize(data?.vendor.address, 60);
  address.forEach((line: string, index: number) => {
    doc.text(line, 15, 110 + index * 5);
  });
  // delivery address
  doc.setFont("helvetica", "bold");
  doc.text("Delivery Address", 130, 95);
  doc.setFont("helvetica", "normal");
  doc.text("Shinpo Engineering PTE. LTD.", 130, 105);
  doc.text("1 Tuas South Avenue 6, #05-20", 130, 110);
  doc.text("S-637021", 130, 115);
  doc.text("Singapore", 130, 120);
  // billing address to the right
  doc.setFont("helvetica", "bold");
  doc.text("Billing Address", 130, 140);
  doc.setFont("helvetica", "normal");
  doc.text("Shinpo Engineering PTE. LTD.", 130, 150);
  doc.text("1 Tuas South Avenue 6, #05-20", 130, 155);
  doc.text("S-637021", 130, 160);
  doc.text("Singapore", 130, 165);
  doc.text("Tel: 65 6265 1234", 130, 170);
  doc.text("Fax: 65 6265 1234", 130, 175);
  doc.text("admin@shinpoengineering.com", 130, 180);
  // table
  autoTable(doc, {
    theme: "striped",
    head: [["No.", "Item", "Description", "Quantity", "Unit Price", "Total"]],
    body: body || [],
    startY: 190,
    margin: { top: 10 },
    tableWidth: "auto",
    tableLineColor: [0, 0, 0],
    ...tableConfig,
  });
  // total
  doc.setFontSize(9);
  doc.text("SUBTOTAL:", 150, 250);
  doc.text(`${subtotal}`, 186, 250);
  doc.text("Delivery Charge:", 150, 255);
  doc.text(`${data?.spares[0]?.spareDetails["Delivery Charge"]}`, 186, 255);
  doc.text("Discount:", 150, 260);
  doc.text(`${data?.spares[0]?.spareDetails.Discount}`, 186, 260);
  doc.text("TOTAL:", 150, 265);
  doc.text(`${total}`, 186, 265);
  doc.addPage();
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Terms & Conditions", 15, 15);
  doc.setFont("helvetica", "normal");
  termsandConditions.forEach((term, index) => {
    doc.text(`${index + 1}. ${term}`, 15, 25 + index * 10);
  });

  // return doc.save("po.pdf");
  return doc.output("blob");
}
