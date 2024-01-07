interface JobFormType {
  id: string;
  jobCode: string;
  receivedAt: Date | string | null;
  quotedAt: Date | string | null;
  shipName: string;
  company: number | null;
  assignedTo: number | null;
  targetPort: string;
  poNumber: string;
  vesselEta: Date | string | null;
  services: { id: number; title: string }[];
  type: string;
  description: string;
}
