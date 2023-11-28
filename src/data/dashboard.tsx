import accounting from "../assets/svg/dashboard/accounting.svg";
import agenda from "../assets/svg/dashboard/agenda.svg";
import contracts from "../assets/svg/dashboard/contracts.svg";
import credit from "../assets/svg/dashboard/credit.svg";
import dashboard from "../assets/svg/dashboard/dashboard.svg";
import debit from "../assets/svg/dashboard/debit.svg";
import documents from "../assets/svg/dashboard/documents.svg";
import fundraising from "../assets/svg/dashboard/fundraising.svg";
import generalAccounting from "../assets/svg/dashboard/general-accounting.svg";
import incidents from "../assets/svg/dashboard/incidents.svg";
import meetings from "../assets/svg/dashboard/meetings.svg";
import members from "../assets/svg/dashboard/members.svg";
import membersInvoice from "../assets/svg/dashboard/members-invoice.svg";
import membersPayment from "../assets/svg/dashboard/members-payment.svg";
import messages from "../assets/svg/dashboard/messages.svg";
import news from "../assets/svg/dashboard/news.svg";
import property from "../assets/svg/dashboard/property.svg";
import peropertyInvoice from "../assets/svg/dashboard/property-invoice.svg";
import rental from "../assets/svg/dashboard/rental.svg";
import suppliers from "../assets/svg/dashboard/suppliers.svg";
import tasks from "../assets/svg/dashboard/tasks.svg";
import tresoryCashflow from "../assets/svg/dashboard/tresory-cashflow.svg";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import EditJobButton from "@/components/atoms/button/edit";
import DeleteJobButton from "@/components/atoms/button/delete";

export const sidebar: SidebarMenu[] = [
  {
    id: 0,
    type: "menu",
    title: "Dashboard",
    icon: dashboard,
    slug: "",
    children: [],
    api: "",
    notifications: false,
  },
  {
    id: 2,
    type: "menu",
    title: "Members",
    icon: members,
    slug: "/members",
    children: [],
    api: "",
    notifications: false,
  },
  {
    id: 3,
    type: "dropdown",
    title: "Management",
    icon: accounting,
    slug: "/accounting",
    children: [
      {
        id: "3a",
        type: "menu",
        title: "General Management",
        icon: generalAccounting,
        slug: "/",
        children: [],
        api: "",
        notifications: false,
      },
      {
        id: "3b",
        type: "menu",
        title: "Client Management",
        icon: rental,
        slug: "/",
        children: [],
        api: "",
        notifications: false,
      },
      {
        id: "3c",
        type: "menu",
        title: "Vendor Management",
        icon: membersPayment,
        slug: "/",
        children: [],
        api: "",
        notifications: false,
      },
    ],
    api: "",
    notifications: false,
  },
  {
    id: 4,
    type: "menu",
    title: "Documents",
    icon: documents,
    slug: "/documents",
    children: [],
    api: "",
    notifications: false,
  },
  {
    id: 5,
    type: "menu",
    title: "Incidents",
    icon: incidents,
    slug: "/incidents",
    children: [],
    api: "",
    notifications: true,
  },
  {
    id: 6,
    type: "menu",
    title: "Messages",
    icon: messages,
    slug: "/messages",
    children: [],
    api: "",
    notifications: true,
  },
  {
    id: 7,
    type: "menu",
    title: "Agenda",
    icon: agenda,
    slug: "/agenda",
    children: [],
    api: "",
    notifications: false,
  },
  {
    id: 8,
    type: "menu",
    title: "Meetings",
    icon: meetings,
    slug: "/meetings",
    children: [],
    api: "",
    notifications: false,
  },
  {
    id: 9,
    type: "menu",
    title: "Tasks",
    icon: tasks,
    slug: "/tasks",
    children: [],
    api: "",
    notifications: false,
  },
  {
    id: 10,
    type: "menu",
    title: "News",
    icon: news,
    slug: "/news",
    children: [],
    api: "",
    notifications: false,
  },
];

export const tableData = [
  {
    id: 0,
    jobCode: "J001",
    date: "2021-08-01",
    quotationDate: "2021-08-01",
    shipName: "Ship 1",
    companyName: "Company 1",
    engineer: "Engineer 1",
    poNumber: "PO 1",
    targetPort: "Port 1",
    vesselEta: "2021-08-01",
    jobDescription: "Job 1",
    spares: "Spares 1",
    agent: "Agent 1",
    reminderSent: true,
    status: "completed",
  },
  {
    id: 1,
    jobCode: "J002",
    date: "2021-08-01",
    quotationDate: "2021-08-01",
    shipName: "Ship 2",
    companyName: "Company 2",
    engineer: "Engineer 2",
    poNumber: "PO 2",
    targetPort: "Port 2",
    vesselEta: "2021-08-01",
    jobDescription: "Job 2",
    spares: "Spares 2",
    agent: "Agent 2",
    reminderSent: true,
    status: "Completed",
  },
  {
    id: 2,
    jobCode: "J003",
    date: "2021-08-01",
    quotationDate: "2021-08-01",
    shipName: "Ship 3",
    companyName: "Company 3",
    engineer: "Engineer 3",
    poNumber: "PO 3",
    targetPort: "Port 3",
    vesselEta: "2021-08-01",
    jobDescription: "Job 3",
    spares: "Spares 3",
    agent: "Agent 3",
    reminderSent: true,
    status: "Completed",
  },
  {
    id: 3,
    jobCode: "J004",
    date: "2021-08-01",
    quotationDate: "2021-08-01",
    shipName: "Ship 4",
    companyName: "Company 4",
    engineer: "Engineer 4",
    poNumber: "PO 4",
    targetPort: "Port 4",
    vesselEta: "2021-08-01",
    jobDescription: "Job 4",
    spares: "Spares 4",
    agent: "Agent 4",
    reminderSent: true,
    status: "Completed",
  },
];
