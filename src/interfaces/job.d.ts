interface JobType {
  jobCode: string;
  recievedAt: Date | null;
  quotedAt: Date | null;
  shipName: string;
  companyId: number | null;
  serviceCordinatorId: number | null;
  targetPort: string;
  poNumber: string;
  vesselEta: Date | null;
  services: Number[];
  type: number | null;
  description: string;
}
