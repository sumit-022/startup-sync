import jsPDF, { TableConfig } from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "@/assets/image/logo.jpg";

export default function createPO(data: any) {
  const doc = new jsPDF();
  const tableConfig: TableConfig = {
    autoSize: true,
    headerBackgroundColor: "#dce9f1",
    headerTextColor: "#5097ce",
  };

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
  doc.text("PO-001", 15, 80);
  doc.text("01/01/2022", 85, 80);
  doc.text("MT SANDRO", 150, 80);
  doc.setLineWidth(0.5);
  doc.line(15, 85, 195, 85);
  doc.setFont("helvetica", "bold");
  // supplier address
  doc.text("Supplier Address", 15, 95);
  doc.setFont("helvetica", "normal");
  doc.text("Shinpo Engineering PTE. LTD.", 15, 105);
  doc.text("1 Tuas South Avenue 6, #05-20", 15, 110);
  doc.text("S-637021", 15, 115);
  doc.text("Singapore", 15, 120);
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
    body: [
      [
        "1",
        "Spare Part bcukbd  cacg  ueg b yu g  uygs hs  g",
        "lorembuicbvsfvsfjvbvsdjvbsv, bsdkvikb bdvj, abavjvsd,  hbvadl LVvudbv livubdlv nlvb",
        "1",
        "100",
        "100",
      ],
      ["2", "Spare Part", "Spare Part Description", "1", "100", "100"],
      ["3", "Spare Part", "Spare Part Description", "1", "100", "100"],
      ["4", "Spare Part", "Spare Part Description", "1", "100", "100"],
      ["5", "Spare Part", "Spare Part Description", "1", "100", "100"],
    ],
    startY: 190,
    margin: { top: 10 },
    tableWidth: "auto",
    tableLineColor: [0, 0, 0],
    ...tableConfig,
  });
  return doc.save("po.pdf");
}
