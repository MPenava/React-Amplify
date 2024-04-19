import { Image } from "primereact/image";
import imageSrc from "@assets/manitoba.png";

import { SidebarList } from "./SidebarList";
import { SidebarActions } from "./SidebarActions";
const Sidebar = () => {
  return (
    <div className="shadow-5 flex flex-column align-content-between px-3 pt-6 pb-3 h-full w-15rem bg-gray-100 border-round-xl gap-5 overflow-y">
      <div className="flex justify-content-center align-items-center">
        <div className="flex flex-column p-2">
          <div className="flex justify-content-center">
            <Image
              src={imageSrc}
              alt="Image"
              width="70"
              className="flex justify-content-between"
            />
          </div>
          <p className="text-2xl font-bold">
            SCRIB<span className="text-gray-400">4</span>ALL
          </p>
        </div>
      </div>
      <div className="flex flex-column justify-content-between h-full overflow-auto">
        <SidebarList />
        <SidebarActions />
      </div>
    </div>
  );
};

export { Sidebar };
