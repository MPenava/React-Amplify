import { Sidebar } from "./components/sidebar";
import { Content } from "./components/content";
import mainitobaBackground from "../assets/manitoba_background.png";

const MainLayout = () => {
  return (
    <div
      className="flex flex-column h-screen w-screen"
      style={{
        background: `url(${mainitobaBackground})`,
        objectFit: "cover",
      }}
    >
      <div className="flex flex-column p-5" style={{ height: "inherit" }}>
        <div className="flex flex-row gap-5" style={{ height: "inherit" }}>
          <Sidebar />
          <Content />
        </div>
      </div>
    </div>
  );
};

export { MainLayout };
