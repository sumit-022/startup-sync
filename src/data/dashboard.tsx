import dashboard from "../assets/svg/dashboard/dashboard.svg";
import generalAccounting from "../assets/svg/dashboard/general-accounting.svg";
import members from "../assets/svg/dashboard/members.svg";
import rental from "../assets/svg/dashboard/rental.svg";

export const sidebar: SidebarMenu[] = [
  {
    id: 0,
    type: "dropdown",
    title: "Dashboard",
    icon: dashboard,
    slug: "/dashboard",
    children: [
      {
        id: "3a",
        type: "menu",
        title: "Purchase Dashboard",
        icon: generalAccounting,
        slug: "/purchase",
        children: [],
        api: "",
        notifications: false,
      },
      {
        id: "3b",
        type: "menu",
        title: "Sales Dashboard",
        icon: rental,
        slug: "/sales",
        children: [],
        api: "",
        notifications: false,
      },
      {
        id: "3c",
        type: "menu",
        title: "Logistics Dashboard",
        icon: rental,
        slug: "/logistics",
        children: [],
        api: "",
        notifications: false,
      },
    ],
    api: "",
    notifications: false,
  },
  {
    id: 1,
    type: "menu",
    title: "Vendor Management",
    icon: members,
    slug: "/vendor",
    children: [],
    api: "",
    notifications: false,
  },
];

export const tableHeaders: { name: string; show: boolean }[] = [
  {
    name: "Job Code",
    show: true,
  },
  {
    name: "Job Description",
    show: true,
  },
  {
    name: "Quoted Date",
    show: true,
  },
  {
    name: "Recieve Date",
    show: true,
  },
  {
    name: "Ship Name",
    show: true,
  },
  {
    name: "Company Name",
    show: false,
  },
  {
    name: "Service Coordinator",
    show: false,
  },
  {
    name: "Status",
    show: true,
  },
  {
    name: "Action",
    show: true,
  },
];
