import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RigthPanel";
import styles from "./Dashboard.module.css";
import { AssetProvider } from "../../../context/AssetContext";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <AssetProvider>
        <LeftPanel />
        <RightPanel />
      </AssetProvider>
    </div>
  );
};

export default Dashboard;
