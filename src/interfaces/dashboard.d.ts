declare interface SidebarMenu {
  id: number | string;
  type: "menu" | "dropdown" | "item";
  title: string;
  icon: any;
  slug: string;
  children: SidebarMenu[];
  api: string;
  notifications: boolean;
}

//Tabke Data
// id: 0,
// jobCode: "J001",
// date: "2021-08-01",
// quotationDate: "2021-08-01",
// shipName: "Ship 1",
// companyName: "Company 1",
// engineer: "Engineer 1",
// poNumber: "PO 1",
// targetPort: "Port 1",
// vesselEta: "2021-08-01",
// jobDescription: "Job 1",
// spares: "Spares 1",
// agent: "Agent 1",
// reminderSent: true,
// status: "Completed",

declare interface Jobtype {
  id: number;
  jobCode: string;
  receivedAt: string;
  quotedAt: string | null;
  shipName: string | null;
  company: CompanyType;
  assignedTo: ServiceCordinatorType;
  poNumber: string | null;
  status: string;
  type: string;
  jobCompleted: boolean;
  services: ServiceType[];
  invoiceDate: Date | null;
  targetPort: string | null;
  vesselEta: string | null;
  description: string | null;
}

declare interface TableHeader {
  name: string;
  show: boolean;
}
