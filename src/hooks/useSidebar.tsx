import { MenuItem } from "primereact/menuitem";

const listItems: MenuItem[] = [
  {
    label: "DASHBOARD",
    icon: "pi pi-th-large",
    command: () => {
      console.log("click");
    },
  },
  {
    label: "READY TO SENT",
    icon: "pi pi-send",
  },
  {
    label: "SCRIBED NOTES",
    icon: "pi pi-pencil",
  },
  {
    label: "NOTIFICATIONS",
    icon: "pi pi-times",
  },
];

const actionItems: MenuItem[] = [
  {
    label: "SETTINGS",
    icon: "pi pi-cog",
  },
];

export { listItems, actionItems };
