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

declare interface TableData {
  id: number;
  jobCode: string;
  receivedAt: string;
  quotedAt: string;
  shipName: string;
  companyDetails: CompanyType;
  serviceCordinator: ServiceCordinatorType;
  poNumber: string;
  targetPort: string;
  vesselEta: string;
  jobDescription: string;
  spares: string;
  agent: string;
  reminderSent: boolean;
  status: string;
  servicesDetails: ServiceType[];
  type: string;
}

declare interface TableHeader {
  name: string;
  show: boolean;
}
