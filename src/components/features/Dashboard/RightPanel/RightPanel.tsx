import { useContext } from "react";

import Loader from "../Loader/Loader";

import { AssetContext } from "../../../../context/AssetContext";

import styles from "./RightPanel.module.css";
import { NewsWidget } from "./News/News";

const RightPanel = () => {
  const { selectedAsset } = useContext(AssetContext);

  return (
    <div className={styles.rightPanel}>
      {!selectedAsset ? <Loader /> : <NewsWidget />}
    </div>
  );
};

export default RightPanel;
