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
