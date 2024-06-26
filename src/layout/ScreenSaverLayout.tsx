import imageSrc from "@assets/scribe4all.svg";
import { Image } from "primereact/image";
import { Outlet } from "react-router-dom";

const ScreenSaverLayout = () => {
  return (
    <div className="flex flex-column w-screen h-screen gap-4 bg-blue-900 overflow-y-auto">
      <div className="flex flex-row gap-4 p-6">
        <div className="flex justify-content-center">
          <Image
            src={imageSrc}
            alt="Image"
            width="73"
            height="73"
            className="flex justify-content-between"
          />
        </div>
        <div className="flex align-items-center">
          <p className="font-normal text-3xl text-white m-0">
            SCRIB<span className="text-gray-400">4</span>ALL
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-content-center w-full">
        <Outlet />
      </div>
    </div>
  );
};

export { ScreenSaverLayout };
