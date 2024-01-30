interface JobFormType {
  id: string;
  jobCode: string;
  receivedAt: Date | string | null;
  quotedAt: Date | string | null;
  shipName: string;
  company: number | null;
  assignedTo: { id: number; name: string } | null;
  targetPort: string;
  poNumber: string;
  vesselEta: Date | string | null;
  services: { id: number; title: string }[];
  type: string;
  description: string;
  serviceReport: File | null;
}

interface FilterType {
  queriedFrom: Date | string | null;
  queriedUpto: Date | string | null;
  quotedFrom: Date | string | null;
  quotedUpto: Date | string | null;
  assignedTo: JobType["assignedTo"] | null;
  search: string;
  status: JobStatus[] | JobStatus | null;
  type: JobType["type"] | null;
  jobCompleted: boolean;
}
