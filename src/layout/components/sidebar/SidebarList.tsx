import { Menu } from "primereact/menu";

import { listItems } from "../../../hooks";

const SidebarList = () => {
  return (
    <div className="flex justify-content-center">
      <Menu
        model={listItems}
        pt={{
          root: { className: "bg-transparent border-none" },
          menuitem: {
            className: "w-full text-md font-semibold",
          },
          icon: { className: "font-semibold" },
        }}
      />
    </div>
  );
};
export { SidebarList };
