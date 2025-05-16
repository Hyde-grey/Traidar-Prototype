import styles from "./AIPanelHeader.module.css";
import TraidarAgent from "./TraidarAgent/TraidarAgent";

const AIPanelHeader = () => {
  return (
    <div className={styles.AIPanelHeader}>
      <TraidarAgent />
      <div className={styles.chatOptionsContainer}>
        <div className={`${styles.toneSelector}`}>
          <span>Tone:</span>
          <select className={styles.toneDropdown}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AIPanelHeader;
