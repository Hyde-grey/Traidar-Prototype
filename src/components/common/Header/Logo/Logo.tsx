import TraidarLogo from "../../../../assets/IMG/Traidar_Logo_white.png";
import styles from "./Logo.module.css";
const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={TraidarLogo} alt="Traidar-logo" />
    </div>
  );
};

export default Logo;
