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
  }[];
  vendor: VendorType;
  jobCode: string;
  description: string;
  portOfDelivery: string;
  vesselETA: string;
};

const createRfqPdf = (data: RFQPdfType) => {
  const today = new Date();
  const doc = new jsPDF();

  // const tableData = data.spareDetails.map((spare) => ({
  //   "Item Name": spare.title,
  //   Quantity: spare.quantity,
  //   Description: spare.description,
  // }));
  // var config: TableConfig = {
  //   autoSize: false,
  //   printHeaders: true,
  // };

  const tableData: CellInput[][] = data.spareDetails.map((spare, index) => [
    { content: index + 1, styles: { halign: "center" } },
    { content: spare.title, styles: { halign: "center" } },
    { content: spare.quantity, styles: { halign: "center" } },
    { content: spare.description, styles: { halign: "center" } },
    { content: "", styles: { halign: "center" } },
  ]);

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
  doc.text("Requisition for Quote", 110, 60, { align: "center" });
  //line
  doc.setLineWidth(0.5);
  doc.line(15, 65, 195, 65);
  doc.setFontSize(12);
  doc.text("RFQ Number:", 15, 75);
  doc.text("Vessel Name:", 15, 85);
  doc.text("Vessel ETA:", 15, 95);
  doc.text("Job Description:", 15, 105);
  doc.text("Port Of Delivery:", 15, 115);
  doc.setFont("helvetica", "normal");
  doc.text(`RFQ-${data.jobCode}`, 50, 75);
  doc.text(data.shipName, 50, 85);
  doc.text(data.vesselETA, 50, 95);
  doc.text(data.description, 50, 105);
  doc.text(data.portOfDelivery, 50, 115);

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
    startY: 130,
    theme: "striped",
    margin: { top: 130 },
    tableWidth: "auto",
  });
  //go below the table
  doc.setFontSize(12);
  doc.text("Your Reference:", 15, 200);
  doc.text("Discount:", 15, 210);
  doc.text("Delivery Charge:", 15, 220);
  doc.text("Delivery Time:", 15, 230);
  doc.text("Connect Port:", 15, 240);
  doc.text("Remarks:", 15, 250);

  // return doc.save("rfq.pdf");
  return doc.output("blob");
};

export default createRfqPdf;
