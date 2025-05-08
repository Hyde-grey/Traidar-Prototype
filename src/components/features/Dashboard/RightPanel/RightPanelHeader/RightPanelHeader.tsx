import { useContext } from "react";

import { Button } from "../../../../common";
import styles from "./RightPanelHeader.module.css";
import { AssetContext } from "../../../../../context/AssetContext";
import TraidarAgent from "./TraidarAgent/TraidarAgent";

const RightPanelHeader = () => {
  const { selectedAsset } = useContext(AssetContext);
  return (
    <div className={styles.panelHeader}>
      {!selectedAsset ? null : <TraidarAgent />}

      <div className={styles.chatOptionsContainer}>
        <Button
          svg={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="#6C757D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="0.5 3.5"
              />
              <path
                d="M22 12C22 6.47715 17.5228 2 12 2"
                stroke="#6C757D"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 9V13H16"
                stroke="#6C757D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          text={"Chat History"}
        />

        <div className={`${styles.toneSelector} ${styles.button}`}>
          <span>Tone:</span>
          <select className={styles.blueText}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default RightPanelHeader;
