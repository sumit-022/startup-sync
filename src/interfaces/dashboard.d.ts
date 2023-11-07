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
