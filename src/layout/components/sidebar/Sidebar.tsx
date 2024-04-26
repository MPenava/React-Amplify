import { Sidebar as Drawer } from "primereact/sidebar";

import { useState } from "react";

const Sidebar = () => {
  const [visible, setVisible] = useState<boolean>(true);
  return (
    <Drawer
      visible={visible}
      onHide={() => setVisible(true)}
      showCloseIcon={false}
      appendTo={"self"}
      unstyled
      pt={{
        root: {
          className:
            "flex flex-column align-content-between px-3 pt-6 pb-3 h-full w-15rem bg-gray-100 border-round-xl shadow-2 gap-5",
        },
        mask: {
          className: "relative flex w-15rem z-0",
        },
      }}
    ></Drawer>
  );
};

export { Sidebar };
