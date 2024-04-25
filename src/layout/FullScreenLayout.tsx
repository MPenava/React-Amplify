import mainitobaBackground from "@assets/scribe4all_background.svg";
import { Outlet } from "react-router-dom";

const FullScreenLayout = () => {
  return (
    <div
      className="flex flex-column h-screen w-screen bg-cover bg-no-repeat"
      style={{
        background: `url(${mainitobaBackground})`,
      }}
    >
      <div
        className="flex flex-column p-5 h-full w-screen"
        style={{ height: "inherit" }}
      >
        {/* Content */}
        <div className="flex flex-column h-full w-full bg-white border-round-xl p-5 shadow-2 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { FullScreenLayout };
