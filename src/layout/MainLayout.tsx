import { Sidebar } from "./components/sidebar";
import { Content } from "./components/content";
import mainitobaBackground from "@assets/scribe4all_background.svg";

const MainLayout = () => {
  return (
    <div
      className="flex flex-column h-screen w-screen bg-cover bg-no-repeat"
      style={{
        background: `url(${mainitobaBackground})`,
      }}
    >
      <div className="flex p-5 w-screen" style={{ height: "inherit" }}>
        <div className="flex flex-row gap-5 h-full w-screen">
          <Sidebar />
          <Content />
        </div>
      </div>
    </div>
  );
};

export { MainLayout };
