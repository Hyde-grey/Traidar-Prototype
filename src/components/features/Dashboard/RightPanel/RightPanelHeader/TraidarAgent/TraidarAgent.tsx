import Stars from "../../../../../../assets/SVG/Stars.svg";
import styles from "./TraidarAgent.module.css";

const TraidarAgent = () => {
  return (
    <div className={styles.traidarAgentContainer}>
      <div className={styles.agentName}>
        <img src={Stars} alt="stars" />
        <h4 className={styles.white}>Traidar Agent</h4>
      </div>
      <p>Please trade responsibly. Not financial advice.</p>
    </div>
  );
};

export default TraidarAgent;
