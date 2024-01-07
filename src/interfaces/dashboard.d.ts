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

declare interface JobType {
  id: number;
  jobCode: string;
  receivedAt: string | undefined;
  quotedAt: string | undefined;
  shipName: string | undefined;
  company: CompanyType;
  assignedTo: ServiceCoordinatorType;
  poNumber: string | undefined;
  status: JobStatus;
  type: JobNature | undefined;
  jobCompleted: boolean;
  services: ServiceType[];
  invoiceDate: Date | undefined;
  targetPort: string | undefined;
  vesselEta: string | undefined;
  description: string | undefined;
  notification:
    | {
        body: string;
        title: string;
        timestamp: string;
        viewed: boolean;
      }
    | undefined;
}

declare type JobStatus =
  | "QUERYRECEIVED"
  | "QUOTEDTOVENDOR"
  | "QUOTERECEIVED"
  | "QUOTEDTOCLIENT"
  | "ORDERCONFIRMED"
  | "JOBCOMPLETED"
  | "JOBCANCELLED"
  | "PODAWAITED";

declare type JobNature = "SPARES SUPPLY" | "SERVICES";

declare interface TableHeader {
  name: string;
  show: boolean;
}

declare interface FilterType {
  queriedFrom: (val: JobType) => boolean;
  queriedUpto: (val: JobType) => boolean;
  quotedFrom: (val: JobType) => boolean;
  quotedUpto: (val: JobType) => boolean;
  type: (val: JobType) => boolean;
  assignedTo: (val: JobType) => boolean;
  status?: (val: JobType) => boolean;
}

declare interface ActionModalType {
  view: {
    show: boolean;
    job: JobType | undefined;
  };
  edit: {
    show: boolean;
    job: JobType | undefined;
  };
  cancel: {
    show: boolean;
    job: JobType | undefined;
  };
  flag: {
    show: boolean;
    job: JobType | undefined;
  };
}
