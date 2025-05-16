import Stars from "../../../../../../assets/SVG/Stars.svg";
import styles from "./TraidarAgent.module.css";

const TraidarAgent = () => {
  return (
    <div className={styles.traidarAgentContainer}>
      <div className={styles.agentName}>
        <img src={Stars} alt="Pip AI Agent icon" />
        <h4 className={styles.white}>PIP AI Agent</h4>
      </div>
      <p>Please trade responsibly. Not financial advice.</p>
    </div>
  );
};

export default TraidarAgent;
