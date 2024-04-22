import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";

type Spinner = {
  visible: boolean;
};

const Spinner = ({ visible = false }: Spinner) => {
  return (
    <div className="absolute flex justify-content-center">
      {visible && <ProgressSpinner style={{ zIndex: 9999 }} />}
      <BlockUI blocked={visible} fullScreen></BlockUI>
    </div>
  );
};

export { Spinner };
