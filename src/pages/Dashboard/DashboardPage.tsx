import styles from "./DashboardPage.module.css";
import { FadeInMotion } from "../../components/common";
import LeftPanel from "../../components/features/Dashboard/LeftPanel/LeftPanel";
import RightPanel from "../../components/features/Dashboard/RightPanel/RightPanel";

const DashboardPage = () => {
  return (
    <FadeInMotion
      transition={{ duration: 3, ease: "easeInOut" }}
      initial={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
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
