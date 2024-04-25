import { Outlet } from "react-router-dom";
const Content = () => {
  return (
    <div className="flex flex-column h-full w-full bg-white border-round-xl shadow-2 px-5 py-5 overflow-auto">
      <Outlet />
    </div>
  );
};

export { Content };
