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
import AssetChart from "./AssetChart/AssetChart";
import { AssetContext } from "../../../../context/AssetContext";

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
      <div className={styles.panelHeader}>
        <SearchAssets />
        <Button svg={<img src={SavedIcon} alt="Saved" />} text="Saved" />
      </div>
      <div className={styles.panelContent}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LeftPanelLoader key="loader" />
          ) : assetData ? (
            <div className={styles.assetDetails}>
              <Sentiment />
              <AssetPrice />
              <AssetChart />
              {/* Additional asset details can go here */}
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
