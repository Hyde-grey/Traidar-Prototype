import SavedIcon from "../../../../assets/SVG/Saved.svg";
import Button from "../../../../components/common/Button/Button";
import SearchAssets from "./SearchAssets/SearchAssets";
import Loader from "../Loader/Loader";
import styles from "./LeftPanel.module.css";
import { useState, useEffect, useContext } from "react";
import LeftPanelLoader from "../Loader/LeftPanelLoader";
import { AnimatePresence } from "framer-motion";
import Sentiment from "./Sentiment/Sentiment";
import AssetPrice from "./AssetPrice/AssetPrice";
import { AssetContext } from "../../../../context/AssetContext";
import { FadeInMotion } from "../../../../components/common";
import TradingViewChart from "./TradingViewChart/TradaingViewChart";

/**
 * The main left panel component displaying asset data and charts
 */
const LeftPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { assetData } = useContext(AssetContext);

  // Simulate loading state for demo purposes
  useEffect(() => {
    // Start with loading state
    setIsLoading(true);

    // After 2 seconds, set loading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.leftPanel}>
      {/* Panel Header with search and buttons */}
      <div className={styles.panelHeader}>
        <SearchAssets />
        <FadeInMotion
          key="saved-button"
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        >
          <Button svg={<img src={SavedIcon} alt="Saved" />} text="Saved" />
        </FadeInMotion>
      </div>

      {/* Panel Content with main data display */}
      <div className={styles.panelContent}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LeftPanelLoader key="loader" />
          ) : assetData ? (
            <div className={styles.assetDetails}>
              {/* Each component is self-contained with its own FadeInMotion */}
              {/* The staggered effect comes from the increasing delays */}
              <Sentiment />
              <AssetPrice />
              <TradingViewChart />
            </div>
          ) : (
            <Loader key="placeholder" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LeftPanel;
