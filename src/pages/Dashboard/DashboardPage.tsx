import styles from "./DashboardPage.module.css";
import { FadeInMotion } from "../../components/common";
import LeftPanel from "../../components/features/Dashboard/LeftPanel/LeftPanel";
import RightPanel from "../../components/features/Dashboard/RightPanel/RightPanel";

const DashboardPage = () => {
  return (
    <FadeInMotion
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={styles.dashboardContainer}
    >
      <div className={styles.dashboardContent}>
        <LeftPanel />
        <RightPanel />
      </div>
    </FadeInMotion>
  );
};

export default DashboardPage;
