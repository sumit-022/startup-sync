interface JobType {
  jobCode: string;
  description?: string;
  recievedAt: Date | string;
  quotedAt?: Date | string | null;
  shipName?: string;
  cancelReason?: string;
  targetPort?: string;
  vesselETA?: Date | string;
  services?: string[];
  spares?: string[];
  company?: string;
  invoiceDate?: Date | string | null;
  completedAt?: Date | string | null;
  serviceCordinator?: string;
  agent?: string;
}
