import { Menu } from "primereact/menu";

import { actionItems } from "@hooks";

const SidebarActions = () => {
  return (
    <Menu
      className="menu"
      model={actionItems}
      pt={{
        root: { className: "bg-transparent border-none" },
        menuitem: {
          className: "w-full text-md font-semibold p-1",
        },
        icon: { className: "font-semibold" },
      }}
    />
  );
};

export { SidebarActions };
