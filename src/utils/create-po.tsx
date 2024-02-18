import jsPDF, {
  TableConfig,
  CellConfig,
  TableCellData,
  TableRowData,
} from "jspdf";
import logo from "@/assets/image/logo.jpg";

export default function createPO(data: any) {
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
  doc.setFontSize(20);

  doc.text("Purchase Order", 110, 65, { align: "center" });
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("7B GLOBAL LOGISTICS PTE LTD".toUpperCase(), 15, 80);
  doc.setFont("helvetica", "normal");
  doc.text("1 Tuas South Avenue 6 , #05-20", 15, 85);
  doc.text("The Westcom", 15, 90);
  doc.text("Singapore 637021", 15, 95);
  doc.text("Tel: +65 81321465", 15, 100);
  doc.text(
    "We are please to place the order for subject enquiry as per your quotes received",
    15,
    115
  );

  return doc.save("po.pdf");
}
