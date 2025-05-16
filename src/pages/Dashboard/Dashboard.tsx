import LeftPanel from "../../components/features/Dashboard/LeftPanel/LeftPanel";
import RightPanel from "../../components/features/Dashboard/RightPanel/RightPanel";
import styles from "./Dashboard.module.css";
import { AssetProvider } from "../../context/AssetContext";

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
