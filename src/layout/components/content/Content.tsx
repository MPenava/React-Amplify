import { Outlet } from "react-router-dom";
const Content = () => {
  return (
    <div className="shadow-5 flex flex-column h-full w-full overflow-auto bg-white border-round-xl px-5 py-5 overflow-auto">
      <Outlet />
    </div>
  );
};

export { Content };
