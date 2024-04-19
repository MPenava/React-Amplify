import { Image } from "primereact/image";
import imageSrc from "@assets/manitoba.png";
import mainitobaBackground from "@assets/manitoba_background.png";
import { AuthContent } from "./components/content";

const CenterLayout = () => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-no-repeat"
      style={{ background: `url(${mainitobaBackground})` }}
    >
      <div className="w-screen h-20rem flex justify-content-center align-items-center">
        <div className="flex flex-column p-2">
          <div className="flex justify-content-center">
            <Image
              src={imageSrc}
              alt="Image"
              width="120"
              className="flex justify-content-between pb-3"
            />
          </div>
          <p className="text-4xl font-bold">
            SCRIB<span className="text-gray-400">4</span>ALL
          </p>
        </div>
      </div>
      <div className="w-full">
        <AuthContent />
      </div>
    </div>
  );
};

export { CenterLayout };
