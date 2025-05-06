import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RigthPanel";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default Dashboard;
