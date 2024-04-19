import { Sidebar } from "./components/sidebar";
import { Content } from "./components/content";
import mainitobaBackground from "../assets/manitoba_background.png";

const MainLayout = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-no-repeat"
      style={{
        background: `url(${mainitobaBackground})`,
        objectFit: "cover",
      }}
    >
      <div
        className="flex flex-col p-5 h-full w-screen overflow-hidden"
        style={{ height: "inherit" }}
      >
        <div
          className="flex flex-row gap-5 h-full w-screen overflow-auto"
          style={{ height: "inherit" }}
        >
          <Sidebar />
          <Content />
        </div>
      </div>
    </div>
  );
};

export { MainLayout };
