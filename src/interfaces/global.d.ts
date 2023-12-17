declare interface Callback<T = { [key: string]: value }> {
  (result?: T, error?: Error): void;
}

interface ServiceCordinatorType {
  id: number;
  username: string;
  email: string;
  fullname: string;
}

interface CompanyType {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
}

interface ServiceType {
  id: number;
  name: string;
}
