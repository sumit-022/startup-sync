import jsPDF, { TableCellData } from "jspdf";
import logo from "@/assets/image/logo.jpg";
import { TableConfig, CellConfig } from "jspdf";
import autoTable, { CellInput } from "jspdf-autotable";

type RFQPdfType = {
  shipName: string;
  spareDetails: {
    title: string;
    description: string;
    quantity: string;
    unitPrice: string;
  }[];
  vendor: VendorType;
  jobCode: string;
  description: string;
  portOfDelivery: string;
  remarks: string;
  deliveryTime: string;
  connectPort: string;
  discount: string;
  yourReference: string;
  deliveryCharge: string;
  amountPayable: string;
  subtotal: string;
};

export default function createAckPDF(data: RFQPdfType) {
  const tableData: CellInput[][] = data.spareDetails.map((spare, index) => [
    { content: index + 1, styles: { halign: "center" } },
    { content: spare.title, styles: { halign: "center" } },
    { content: spare.quantity, styles: { halign: "center" } },
    { content: spare.description, styles: { halign: "center" } },
    { content: spare.unitPrice, styles: { halign: "center" } },
  ]);
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("SHINPO ENGINEERING PTE LTD", 15, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("1 Tuas South Avenue 6 , #05-20", 15, 20);
  doc.text("The Westcom", 15, 25);
  doc.text("Singapore 637021", 15, 30);
  doc.text("Tel: +65 81321465", 15, 35);
  doc.text("admin@shinpoengineering.com", 15, 40);
  doc.text("GST Registration No. : 202215215M", 15, 45);

  doc.addImage(logo.src, "JPEG", 150, 15, 45, 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  //underline
  doc.text("Acknowledgement for Requisition for Quote", 110, 60, {
    align: "center",
  });
  //line
  doc.setLineWidth(0.5);
  doc.line(15, 65, 195, 65);
  doc.setFontSize(12);
  doc.text("RFQ Number:", 15, 75);
  doc.text("Vessel Name:", 15, 85);
  doc.text("Job Description:", 15, 95);
  doc.text("Port Of Delivery:", 15, 105);
  doc.setFont("helvetica", "normal");
  doc.text(`${data.jobCode}`, 50, 75);
  doc.text(data.shipName, 50, 85);
  doc.text(data.description, 50, 95);
  doc.text(data.portOfDelivery, 50, 105);

  //supplier details to the right side
  doc.setFont("helvetica", "bold");
  doc.text("Supplier Details:", 130, 75);
  doc.setFont("helvetica", "normal");
  doc.text(data.vendor.name, 130, 85);
  const address = doc.splitTextToSize(data.vendor.address, 60);
  doc.text(address, 130, 90);

  //table
  autoTable(doc, {
    head: [
      [
        { content: "S/N", styles: { halign: "center" } },
        { content: "Item Name", styles: { halign: "center" } },
        { content: "Quantity", styles: { halign: "center" } },
        { content: "Description", styles: { halign: "center" } },
        { content: "Unit Price", styles: { halign: "center" } },
      ],
    ],
    body: tableData,
    startY: 120,
    theme: "striped",
    margin: { top: 120 },
    tableWidth: "auto",
  });
  //go below the table
  doc.setFontSize(12);
  doc.text("Subtotal:", 15, 190);
  doc.text("Your Reference:", 15, 200);
  doc.text("Discount:", 15, 210);
  doc.text("Delivery Charge:", 15, 220);
  doc.text("Amount Payable:", 15, 230);
  doc.text("Delivery Time:", 15, 240);
  doc.text("Connect Port:", 15, 250);
  doc.text("Remarks:", 15, 260);
  doc.setFont("helvetica", "normal");
  doc.text(`SGD ${data.subtotal}`, 50, 190);
  doc.text(data.yourReference, 50, 200);
  doc.text(`${data.discount}%`, 50, 210);
  doc.text(`SGD ${data.deliveryCharge}`, 50, 220);
  doc.text(`SGD ${data.amountPayable}`, 50, 230);
  doc.text(`${data.deliveryTime} Days`, 50, 240);
  doc.text(data.connectPort, 50, 250);
  const remarks = doc.splitTextToSize(data.remarks, 140);
  doc.text(remarks, 50, 260);

  return doc.output("blob");
}
