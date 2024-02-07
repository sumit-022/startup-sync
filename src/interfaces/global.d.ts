declare interface Callback<T = { [key: string]: value }> {
  (result?: T, error?: Error): void;
}

interface ServiceCoordinatorType {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  fullname: string;
  id: number;
  provider: string;
  updatedAt: string;
  username: string;
}

interface CompanyType {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

interface ServiceType {
  id: number;
  title: string;
}

interface ContactType {
  id: number;
  name: string;
  mail: string;
  mobile: string;
  landline: string;
}

interface RFQFormType {
  jobId: string;
  description: string;
  vendors: {
    id: number;
    name: any;
    email: any;
    address: string;
    attachment: File | Blob | null;
  }[];
  shipName: string;
  spareDetails: SpareType[];
}

interface SpareType {
  title: string;
  description: string;
  quantity: string;
  attachments?: FileList | null;
}
