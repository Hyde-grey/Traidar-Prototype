import { useContext } from "react";

import Loader from "../Loader/Loader";
import TraidarAI from "./TraidarAi/TraidarAI";
import { AssetContext } from "../../../../context/AssetContext";
import RightPanelHeader from "./RightPanelHeader/RightPanelHeader";

import styles from "./RightPanel.module.css";

const RightPanel = () => {
  const { selectedAsset } = useContext(AssetContext);

  return (
    <div className={styles.rightPanel}>
      <RightPanelHeader />
      {!selectedAsset ? <Loader /> : <TraidarAI />}
    </div>
  );
};

export default RightPanel;
