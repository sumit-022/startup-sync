import jsPDF, { TableCellData } from "jspdf";
import logo from "@/assets/image/logo.jpg";
import { TableConfig, CellConfig } from "jspdf";

type RFQPdfData = {
  shipName: string;
  spareDetails: {
    name: string;
    quantity: string;
    description: string;
  }[];
};

const createRfqPdf = (data: RFQPdfData) => {
  const myData = {
    shipName: "SINGAPORE CARGO",
    rfqnumber: "RFQ-0001",
  };
  const today = new Date();
  const doc = new jsPDF();
  var header: CellConfig[] = [
    {
      name: "Spare Name",
      prompt: "Spare Name",
      width: 100,
      align: "center",
      padding: 0,
    },
    {
      name: "Quantity",
      prompt: "Quantity",
      width: 50,
      align: "center",
      padding: 0,
    },
    {
      name: "Description",
      prompt: "Description",
      width: 100,
      align: "center",
      padding: 0,
    },
  ];

  const tableData = data.spareDetails.map((spare) => ({
    "Spare Name": spare.name,
    Quantity: spare.quantity,
    Description: spare.description,
  }));
  var config: TableConfig = {
    autoSize: false,
    printHeaders: true,
  };
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
  doc.setTextColor("#1bb1d8");
  //underline
  doc.text("Requisition for Quote", 110, 60, { align: "center" });
  doc.setDrawColor("#1bb1d8");
  doc.setLineWidth(0.5);
  doc.line(75, 62, 145, 62);

  doc.setFontSize(12);
  doc.setTextColor("#000");
  doc.setFont("helvetica", "normal");
  doc.text(`Vessel Name : ${myData.shipName}`, 15, 75);
  doc.text(`RFQ Number : ${myData.rfqnumber}`, 15, 80);
  doc.text(`Date : ${today.toDateString()}`, 150, 75);

  doc.table(15, 90, tableData, header, config);

  //return pdf;
  return doc.output("blob");
};

export default createRfqPdf;
