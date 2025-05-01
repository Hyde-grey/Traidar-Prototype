import SavedIcon from "../../../assets/SVG/Saved.svg";
import Button from "../../Button/Button";
import SearchAssets from "./SearchAssets/SearchAssets";
import Loader from "../Loader/Loader";
import styles from "./LeftPanel.module.css";
import { useState } from "react";
import LeftPanelLoader from "../Loader/LeftPanelLoader";

const LeftPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className={styles.leftPanel}>
      <div className={styles.panelHeader}>
        <SearchAssets />
        <Button svg={<img src={SavedIcon} alt="Saved" />} text={"Saved"} />
      </div>
      {!isLoading ? <Loader /> : <LeftPanelLoader />}
    </div>
  );
};

export default LeftPanel;
