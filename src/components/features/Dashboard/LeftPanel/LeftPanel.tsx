import styles from "./LeftPanel.module.css";

import TradingViewChart from "./TradingViewChart/TradingViewChart";
import { SearchAssets } from "../../SearchAssets";
import TraidarAI from "../RightPanel/TraidarAi/TraidarAI";
import AIPanelHeader from "../RightPanel/RightPanelHeader/AIPanelHeader";

/**
 * The main left panel component displaying asset data and charts
 */
const LeftPanel = () => {
  return (
    <div className={styles.leftPanel}>
      <div className={styles.panelHeader}>
        <div className={styles.assetPriceContainer}>
          <SearchAssets />
        </div>
      </div>
      <div className={styles.panelContent}>
        <div className={styles.traidarAiContainer}>
          <AIPanelHeader />
          <TraidarAI />
        </div>
        <TradingViewChart />
      </div>
    </div>
  );
};

export default LeftPanel;
