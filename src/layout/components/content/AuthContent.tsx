import { Outlet } from "react-router-dom";
const AuthContent = () => {
  return (
    <div className="flex flex-row justify-content-center">
      <Outlet />
    </div>
  );
};

export { AuthContent };
